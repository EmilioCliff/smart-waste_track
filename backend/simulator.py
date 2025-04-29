import random

# Bin Configuration (stored on device)
BIN_CONFIG = {
    "max_height_cm": 20.0,
    "distance_threshold": 80.0,
    "air_quality_threshold": 0.8,
}

BIN_METADATA = [
    {
        "device_id": "BIN-002",
        "apartment": "Treeview Heights",
        "latitude": -1.264736,
        "longitude": 36.811047,
    },
    {
        "device_id": "BIN-003",
        "apartment": "Maplewood Towers",
        "latitude": -1.329176,
        "longitude": 36.715116,
    },
    {
        "device_id": "BIN-004",
        "apartment": "Oakridge Residences",
        "latitude": -1.293489,
        "longitude": 36.761632,
    },
]

# Track current index
current_bin_index = 0

def simulate_readings():
    """Simulate sensor readings with random bin metadata included"""
    global current_bin_index

    bin_info = BIN_METADATA[current_bin_index]
    distance_cm = round(random.uniform(0.0, BIN_CONFIG["max_height_cm"]), 1)
    percentage_full = round(
        ((BIN_CONFIG["max_height_cm"] - distance_cm) / BIN_CONFIG["max_height_cm"]) * 100,
        1,
    )

    is_fill_critical = percentage_full >= BIN_CONFIG["distance_threshold"]
    air_quality = round(random.uniform(0.3, 2.0), 1)
    is_gas_critical = air_quality >= BIN_CONFIG["air_quality_threshold"]

    current_bin_index = (current_bin_index + 1) % len(BIN_METADATA)

    return {
        "device_id": bin_info["device_id"],
        "apartment": bin_info["apartment"],
        "latitude": bin_info["latitude"],
        "longitude": bin_info["longitude"],
        "distance_cm": distance_cm,
        "percentage_full": percentage_full,
        "is_fill_critical": is_fill_critical,
        "air_quality": air_quality,
        "is_gas_critical": is_gas_critical,
    }

def add_bin(device_id, apartment, latitude, longitude):
    """Add a new bin to the metadata list"""
    BIN_METADATA.append({
        "device_id": device_id,
        "apartment": apartment,
        "latitude": latitude,
        "longitude": longitude,
    })

