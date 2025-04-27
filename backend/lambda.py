import json
import boto3

client = boto3.client("lambda")

response = client.invoke(
    FunctionName="ecboinFxn", Payload=json.dumps({"timestamp": "2025-04-24 20:11:13.243000000"})
)

# Read the payload and decode it
payload = response["Payload"].read().decode("utf-8")

# Parse the payload as JSON
data = json.loads(payload)

# Pretty-print the JSON data
print(json.dumps(data, indent=2))
