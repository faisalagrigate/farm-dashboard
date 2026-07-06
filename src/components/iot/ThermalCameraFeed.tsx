import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Play, Camera } from 'lucide-react';

interface ThermalCameraFeedProps {
    media: any[];
    loading: boolean;
    loadMoreMedia?: () => void;
    hasMoreMedia?: boolean;
}

function getVideoPoster(item: any, media: any[]): string | undefined {
    const idx = media.findIndex(m => m._id === item._id);
    const nearby = media.slice(Math.max(0, idx - 2), idx + 3);
    return nearby.find(m => m.mediaType?.startsWith('image/'))?.mediaUrl;
}

export function ThermalCameraFeed({ media, loading, loadMoreMedia, hasMoreMedia }: ThermalCameraFeedProps) {
    const [selectedMedia, setSelectedMedia] = useState<any>(null);

    useEffect(() => {
        setSelectedMedia(null);
    }, [media[0]?._id]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 10;
        if (bottom && hasMoreMedia && loadMoreMedia) {
            loadMoreMedia();
        }
    };

    if (loading && media.length === 0) return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;

    const latest = selectedMedia || media[0];
    const posterImage = media.find(m => m.mediaType?.startsWith('image/'))?.mediaUrl;

    return (
        <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold flex items-center">
                    <Camera className="h-4 w-4 mr-2 text-purple-600" />
                    Thermal Camera Feed
                </h3>
                <span className="text-xs text-gray-500">
                    {latest ? new Date(latest.timestamp).toLocaleString() : 'No media available'}
                </span>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                {latest ? (
                    latest.mediaType?.startsWith('video/') ? (
                        <video
                            key={latest._id}
                            src={latest.mediaUrl}
                            controls
                            className="w-full h-full object-contain"
                            poster={posterImage}
                        />
                    ) : (
                        <img
                            src={latest.mediaUrl}
                            alt="Thermal Feed"
                            className="w-full h-full object-contain"
                        />
                    )
                ) : (
                    <div className="text-gray-500 text-xs">No active feed</div>
                )}
            </div>

            <div 
                className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-2"
                onScroll={handleScroll}
            >
                {media.map((item, idx) => (
                    <button
                        key={item._id}
                        onClick={() => setSelectedMedia(item)}
                        className={`relative aspect-square rounded border-2 overflow-hidden bg-gray-100 transition-all ${latest?._id === item._id ? 'border-purple-500 shadow-sm' : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        {item.mediaType?.startsWith('video/') ? (
                            <div className="relative w-full h-full">
                                {getVideoPoster(item, media) ? (
                                    <img src={getVideoPoster(item, media)} alt="video thumbnail" className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800" />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <Play className="h-4 w-4 text-white" />
                                </div>
                            </div>
                        ) : (
                            <img src={item.mediaUrl} className="w-full h-full object-cover" alt="thumbnail" />
                        )}
                        {idx === 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-1 rounded-bl">LATEST</span>
                        )}
                    </button>
                ))}
                {hasMoreMedia && (
                    <div className="col-span-5 flex justify-center py-2 text-xs text-gray-500">
                        Loading more...
                    </div>
                )}
            </div>
        </Card>
    );
}
