export interface IoTMetric {
    value: number;
    unit: string;
    type: string;
}

export interface IoTData {
    deviceId: string;
    timestamp: string;
    metrics: {
        Temperature: IoTMetric;
        NH3: IoTMetric;
        CO2: IoTMetric;
        RH: IoTMetric;
        "Battery Voltage": IoTMetric;
        "Signal Strength": IoTMetric;
    };
    createdAt: string;
}

export interface ApiResponse {
    status: string;
    data: IoTData[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export async function fetchIoTData(): Promise<ApiResponse> {
    const response = await fetch("https://dev-iot.agrigate.network/iot/data", {
        cache: "no-store",
        // In a real production app, we wouldn't bypass TLS verification like this,
        // but for dev environments with self-signed certs or misconfigurations:
        // next: { revalidate: 0 } 
    });

    if (!response.ok) {
        throw new Error("Failed to fetch IoT data");
    }

    return response.json();
}
