import time
import json
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import datetime
from simulator import simulate_readings
import simulator as simulator
from dotenv import load_dotenv
import os


load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
ENDPOINT = os.getenv("ENDPOINT")
TOPIC = os.getenv("TOPIC")


# Paths to certificates
CERTIFICATE_PATH = os.getenv("CERTIFICATE_PATH")
PRIVATE_KEY_PATH = os.getenv("PRIVATE_KEY_PATH")
ROOT_CA_PATH = os.getenv("ROOT_CA_PATH")


# Create and configure MQTT client
mqtt_client = AWSIoTMQTTClient(CLIENT_ID)
mqtt_client.configureEndpoint(ENDPOINT, 8883)
mqtt_client.configureCredentials(ROOT_CA_PATH, PRIVATE_KEY_PATH, CERTIFICATE_PATH)

# MQTT connection settings
mqtt_client.configureAutoReconnectBackoffTime(1, 32, 20)
mqtt_client.configureOfflinePublishQueueing(-1)  # Infinite queueing
mqtt_client.configureDrainingFrequency(2)  # Drains 2 messages per second
mqtt_client.configureConnectDisconnectTimeout(10)
mqtt_client.configureMQTTOperationTimeout(5)

# Connect to AWS IoT Core
print("Connecting to AWS IoT Core...")
mqtt_client.connect()
print("Connected!")


try:
    while True:
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
            "co2_ppm": readings["co2_ppm"],
            "methane_ppm": readings["methane_ppm"],
            "is_gas_critical": readings["is_gas_critical"],
        }
        # Convert to JSON and publish
        mqtt_client.publish(TOPIC, json.dumps(payload), 1)
        print(f"Published: {payload}")

        time.sleep(5)  # Send data every 5 seconds

except KeyboardInterrupt:
    print("\nDisconnecting...")
    mqtt_client.disconnect()
