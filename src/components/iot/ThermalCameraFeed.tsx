import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Play, Image as ImageIcon, Camera } from 'lucide-react';

interface ThermalCameraFeedProps {
    media: any[];
    loading: boolean;
}

export function ThermalCameraFeed({ media, loading }: ThermalCameraFeedProps) {
    const [selectedMedia, setSelectedMedia] = useState<any>(null);

    if (loading && media.length === 0) return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;

    const latest = selectedMedia || media[0];

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
                    latest.mediaType.startsWith('video/') ? (
                        <video
                            src={latest.mediaUrl}
                            controls
                            className="w-full h-full object-contain"
                            poster={media.find(m => m.mediaType.startsWith('image/'))?.mediaUrl}
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

            <div className="grid grid-cols-5 gap-2">
                {media.map((item, idx) => (
                    <button
                        key={item._id}
                        onClick={() => setSelectedMedia(item)}
                        className={`relative aspect-square rounded border-2 overflow-hidden bg-gray-100 transition-all ${latest?._id === item._id ? 'border-purple-500 shadow-sm' : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        {item.mediaType.startsWith('video/') ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <Play className="h-4 w-4 text-white opacity-50" />
                            </div>
                        ) : (
                            <img src={item.mediaUrl} className="w-full h-full object-cover" alt="thumbnail" />
                        )}
                        {idx === 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-1 rounded-bl">LIVE</span>
                        )}
                    </button>
                ))}
            </div>
        </Card>
    );
}
