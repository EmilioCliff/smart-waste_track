import random

# Bin Configuration (stored on device)
BIN_CONFIG = {
    "max_height_cm": 100.0,
    "fill_critical_percentage": 80.0,
    "co2_critical_ppm": 1000,
    "methane_critical_ppm": 50,
}


# Define bin metadata
BIN_METADATA = [
    {
        "device_id": "BIN-001",
        "apartment": "Greenwood Heights",
        "latitude": 40.643,
        "longitude": -73.979,
    },
    {
        "device_id": "BIN-002",
        "apartment": "Maplewood Towers",
        "latitude": 40.672,
        "longitude": -73.956,
    },
    {
        "device_id": "BIN-003",
        "apartment": "Oakridge Residences",
        "latitude": 40.685,
        "longitude": -73.944,
    },
]


def simulate_readings():
    """Simulate sensor readings with random bin metadata included"""
    # Pick a random bin
    bin_info = random.choice(BIN_METADATA)

    # Simulate distance
    distance_cm = round(random.uniform(5.0, BIN_CONFIG["max_height_cm"]), 1)

    # Calculate percentage full
    percentage_full = round(
        ((BIN_CONFIG["max_height_cm"] - distance_cm) / BIN_CONFIG["max_height_cm"]) * 100,
        1,
    )

    # Critical checks
    is_fill_critical = percentage_full >= BIN_CONFIG["fill_critical_percentage"]
    co2_ppm = round(random.uniform(400, 2000), 0)
    methane_ppm = round(random.uniform(10, 100), 0)
    is_gas_critical = (
        co2_ppm > BIN_CONFIG["co2_critical_ppm"]
        or methane_ppm > BIN_CONFIG["methane_critical_ppm"]
    )

    # Combine all into one return dictionary
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

