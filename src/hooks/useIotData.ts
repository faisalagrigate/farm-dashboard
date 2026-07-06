import { useState, useEffect } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';
const API_URL = `${BASE_URL}/iot/data`;

export function useIotData(deviceId?: string, initialPage: number = 1, initialLimit: number = 50) {
    const [latestData, setLatestData] = useState<any>(null);
    const [allData, setAllData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ total: 0, page: initialPage, limit: initialLimit });
    const [media, setMedia] = useState<any[]>([]);
    const [mediaPage, setMediaPage] = useState(1);
    const [mediaHasMore, setMediaHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMoreMedia = async () => {
        if (!deviceId || !mediaHasMore) return;
        try {
            const nextPage = mediaPage + 1;
            const res = await fetch(`${BASE_URL}/iot/media/${deviceId}?page=${nextPage}&limit=25`);
            if (res.ok) {
                const newData = await res.json();
                if (newData.length < 25) setMediaHasMore(false);
                setMedia(prev => [...prev, ...newData]);
                setMediaPage(nextPage);
            }
        } catch (e) {
            console.error('Failed to load more media', e);
        }
    };

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
                    
                    // Fetch media for this device
                    try {
                        const mediaRes = await fetch(`${BASE_URL}/iot/media/${deviceId}?limit=25`, {
                            cache: 'no-store'
                        });
                        if (mediaRes.ok) {
                            const mediaData = await mediaRes.json();
                            setMedia(mediaData || []);
                            setMediaPage(1);
                            setMediaHasMore((mediaData || []).length === 25);
                        }
                    } catch (e) {
                        console.error('Failed to fetch media', e);
                    }
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
        mediaHasMore,
        loadMoreMedia,
        loading,
        error,
        refetch: fetchData,
        setPage
    };
}
