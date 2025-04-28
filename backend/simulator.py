import random

# Bin Configuration (stored on device)
BIN_CONFIG = {
    "max_height_cm": 100.0,
    "fill_critical_percentage": 80.0,
    "co2_critical_ppm": 1000,
    "methane_critical_ppm": 50,
}


BIN_METADATA = [
    {
        "device_id": "BIN-001",
        "apartment": "Greenwood Heights",
        "latitude": -1.264736,
        "longitude": 36.811047,
    },
    {
        "device_id": "BIN-002",
        "apartment": "Maplewood Towers",
        "latitude": -1.329176,
        "longitude": 36.715116,
    },
    {
        "device_id": "BIN-003",
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
    distance_cm = round(random.uniform(5.0, BIN_CONFIG["max_height_cm"]), 1)
    percentage_full = round(
        ((BIN_CONFIG["max_height_cm"] - distance_cm) / BIN_CONFIG["max_height_cm"]) * 100,
        1,
    )

    is_fill_critical = percentage_full >= BIN_CONFIG["fill_critical_percentage"]
    co2_ppm = round(random.uniform(400, 2000), 0)
    methane_ppm = round(random.uniform(10, 100), 0)
    is_gas_critical = (
        co2_ppm > BIN_CONFIG["co2_critical_ppm"]
        or methane_ppm > BIN_CONFIG["methane_critical_ppm"]
    )

    current_bin_index = (current_bin_index + 1) % len(BIN_METADATA)

    return {
        "device_id": bin_info["device_id"],
        "apartment": bin_info["apartment"],
        "latitude": bin_info["latitude"],
        "longitude": bin_info["longitude"],
        "distance_cm": distance_cm,
        "percentage_full": percentage_full,
        "is_fill_critical": is_fill_critical,
        "co2_ppm": co2_ppm,
        "methane_ppm": methane_ppm,
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

