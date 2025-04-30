import time
import json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import datetime
from simulator import simulate_readings, add_bin, BIN_METADATA
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import threading
import os
import tempfile
from flask_cors import CORS

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
ENDPOINT = os.getenv("ENDPOINT")
TOPIC = os.getenv("TOPIC")


# Create and configure MQTT client
mqtt_client = AWSIoTMQTTClient(CLIENT_ID)
mqtt_client.configureEndpoint(ENDPOINT, 8883)

certificate_pem = os.getenv("CERTIFICATE_PEM")
private_key_pem = os.getenv("PRIVATE_KEY_PEM")
root_ca_pem = os.getenv("ROOT_CA_PEM")

frontend_url = os.getenv("FRONTEND_URL")

certificate_file = tempfile.NamedTemporaryFile(delete=False, mode="w", suffix=".pem")
private_key_file = tempfile.NamedTemporaryFile(delete=False, mode="w", suffix=".key")
root_ca_file = tempfile.NamedTemporaryFile(delete=False, mode="w", suffix=".crt")

certificate_file.write(certificate_pem)
private_key_file.write(private_key_pem)
root_ca_file.write(root_ca_pem)

certificate_file.close()
private_key_file.close()
root_ca_file.close()

CERTIFICATE_PATH = certificate_file.name
PRIVATE_KEY_PATH = private_key_file.name
ROOT_CA_PATH = root_ca_file.name

mqtt_client.configureCredentials(ROOT_CA_PATH, PRIVATE_KEY_PATH, CERTIFICATE_PATH)

# MQTT connection settings
mqtt_client.configureAutoReconnectBackoffTime(1, 32, 20)
mqtt_client.configureOfflinePublishQueueing(-1)  
mqtt_client.configureDrainingFrequency(2) 
mqtt_client.configureConnectDisconnectTimeout(10)
mqtt_client.configureMQTTOperationTimeout(5)

app = Flask(__name__)

CORS(app,
    resources={r"/*": {"origins": frontend_url}},
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"]
)

def bin_exists(device_id):
    """Check if a bin with the same device_id already exists."""
    return any(bin['device_id'] == device_id for bin in BIN_METADATA)

@app.route('/add-bin', methods=['POST', 'OPTIONS'])
def add_bin_endpoint():
    if request.method == 'OPTIONS':
        return '', 200
    
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON body"}), 400

    required_fields = ["device_id", "apartment", "latitude", "longitude"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400
    
    device_id = data["device_id"]

    if bin_exists(device_id):
        return jsonify({"error": f"Bin with device_id '{device_id}' already exists"}), 409
    
    try:
        add_bin(
            device_id=data["device_id"],
            apartment=data["apartment"],
            latitude=float(data["latitude"]),
            longitude=float(data["longitude"]),
        )
        return jsonify({"message": "Bin added successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def run_flask():
    app.run(host="0.0.0.0", port=5000)

# Connect to AWS IoT Core
print("Connecting to AWS IoT Core...")
mqtt_client.connect()
print("Connected!")

flask_thread = threading.Thread(target=run_flask)
flask_thread.daemon = True
flask_thread.start()

def publish_data():
    try:
        while True:
            for bin in BIN_METADATA:
                # Get CPU utilization
                readings = simulate_readings()
                timestamp = int(datetime.datetime.now().timestamp() * 1000)
                # Create payload
                payload = {
                    "device_id": readings["device_id"],
                    "apartment": readings["apartment"],
                    "timestamp": timestamp,
                    "latitude": readings["latitude"],
                    "longitude": readings["longitude"],
                    "distance_cm": readings["distance_cm"],
                    "is_fill_critical": readings["is_fill_critical"],
                    "percentage_full": readings["percentage_full"],
                    "air_quality": readings["air_quality"],
                    "is_gas_critical": readings["is_gas_critical"],
                }
                # Convert to JSON and publish
                mqtt_client.publish(TOPIC, json.dumps(payload), 1)
                print(f"Published: {payload}")

            time.sleep(120)  # Sleep for 2 minutes

    except KeyboardInterrupt:
        print("\nDisconnecting...")
        mqtt_client.disconnect()

publish_data()       
