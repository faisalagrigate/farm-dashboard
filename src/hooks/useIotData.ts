import { useState, useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';
const API_URL = `${BASE_URL}/iot/data`;

export function useIotData(deviceId?: string, initialPage: number = 1, initialLimit: number = 50) {
    const [latestData, setLatestData] = useState<any>(null);
    const [allData, setAllData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ total: 0, page: initialPage, limit: initialLimit });
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (page: number = pagination.page, limit: number = pagination.limit) => {
        try {
            setLoading(true);

            // Construct URL with pagination parameters
            const url = new URL(API_URL);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('limit', limit.toString());
            if (deviceId) url.searchParams.append('deviceId', deviceId);

            // Fetch data from the new IoT API
            console.log(`[useIotData] Fetching: ${url.toString()}`);
            const response = await fetch(url.toString(), {
                cache: 'no-store'
            });

            if (response.ok) {
                const result = await response.json();
                const dataArray = result.data || [];
                const paginationInfo = result.pagination || {};

                console.log(`[useIotData] Received ${dataArray.length} items. Total: ${paginationInfo.total}`);
                setAllData(dataArray);
                setPagination({
                    total: paginationInfo.total || dataArray.length,
                    page: paginationInfo.page || page,
                    limit: paginationInfo.limit || limit
                });

                // If deviceId is provided, filter for that device's latest reading
                if (deviceId) {
                    const deviceLatest = dataArray.find((item: any) => item.deviceId === deviceId);
                    setLatestData(deviceLatest || null);
                } else if (dataArray.length > 0) {
                    setLatestData(dataArray[0]);
                }
            } else {
                throw new Error('Failed to fetch IoT data');
            }

            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch IoT data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [deviceId, pagination.page, pagination.limit]);

    const setPage = (page: number) => setPagination(prev => ({ ...prev, page }));

    return {
        latestData,
        allData,
        pagination,
        media,
        loading,
        error,
        refetch: fetchData,
        setPage
    };
}
