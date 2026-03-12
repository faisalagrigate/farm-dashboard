import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_IOT_API_URL || 'http://localhost:3000/iot';

export function useIotData(deviceId: string) {
    const [latestData, setLatestData] = useState<any>(null);
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch latest sensor data
            const dataRes = await fetch(`${API_BASE_URL}/data/${deviceId}/latest`);
            if (dataRes.ok) {
                const data = await dataRes.json();
                setLatestData(data);
            }

            // Fetch latest media
            const mediaRes = await fetch(`${API_BASE_URL}/media/${deviceId}?limit=5`);
            if (mediaRes.ok) {
                const mediaData = await mediaRes.json();
                setMedia(mediaData);
            }

            setError(null);
        } catch (err) {
            setError('Failed to fetch IoT data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (deviceId) {
            fetchData();
            const interval = setInterval(fetchData, 30000); // Refresh every 30s
            return () => clearInterval(interval);
        }
    }, [deviceId]);

    return { latestData, media, loading, error, refetch: fetchData };
}
