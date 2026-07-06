import React, { useState } from 'react';
import { Badge } from '../ui/badge';
import { Camera, Play, Download, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_IOT_API_URL || 'https://dev-iot.agrigate.network';

interface DeviceMediaGalleryProps {
    deviceId: string;
    onClose: () => void;
}

export function DeviceMediaGallery({ deviceId, onClose }: DeviceMediaGalleryProps) {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<any>(null);
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [downloading, setDownloading] = useState<string | null>(null);

    React.useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/iot/media/${deviceId}?limit=50`, { cache: 'no-store' })
            .then(r => r.ok ? r.json() : [])
            .then(data => {
                const list = Array.isArray(data) ? data : (data?.data || []);
                setMedia(list);
                if (list.length > 0) {
                    setSelected(list[0]);
                    setSelectedIdx(0);
                }
            })
            .catch(() => setMedia([]))
            .finally(() => setLoading(false));
    }, [deviceId]);

    const navigate = (dir: number) => {
        const next = (selectedIdx + dir + media.length) % media.length;
        setSelectedIdx(next);
        setSelected(media[next]);
    };

    const handleDownload = async (item: any) => {
        setDownloading(item._id);
        try {
            const res = await fetch(item.mediaUrl);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const ext = item.mediaType.startsWith('video/') ? 'mp4' : 'jpg';
            a.href = url;
            a.download = `${deviceId}_${new Date(item.timestamp).toISOString().slice(0, 19).replace(/:/g, '-')}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch {
            window.open(item.mediaUrl, '_blank');
        } finally {
            setDownloading(null);
        }
    };

    const images = media.filter(m => m.mediaType?.startsWith('image/'));
    const videos = media.filter(m => m.mediaType?.startsWith('video/'));

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-xl">
                            <Camera className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Device Media</h2>
                            <p className="text-xs text-gray-500 font-mono">{deviceId}</p>
                        </div>
                        <div className="flex gap-2 ml-2">
                            <Badge className="bg-blue-100 text-blue-800 text-[10px]">{images.length} images</Badge>
                            <Badge className="bg-purple-100 text-purple-800 text-[10px]">{videos.length} videos</Badge>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-24">
                        <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-10 w-10 border-2 border-purple-600 border-t-transparent" />
                            <p className="text-sm text-gray-500">Loading media…</p>
                        </div>
                    </div>
                ) : media.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 py-24">
                        <Camera className="h-12 w-12 opacity-30" />
                        <p className="text-sm">No media captured yet for this device</p>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[400px]">
                        <div className="flex-1 flex flex-col bg-gray-950 relative">
                            {media.length > 1 && (
                                <>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => navigate(1)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}

                            <div className="flex-1 flex items-center justify-center p-4 min-h-0">
                                {selected?.mediaType?.startsWith('video/') ? (
                                    <video
                                        key={selected._id}
                                        src={selected.mediaUrl}
                                        controls
                                        className="max-w-full max-h-full rounded-lg"
                                    />
                                ) : (
                                    <img
                                        key={selected?._id}
                                        src={selected?.mediaUrl}
                                        alt="Device media"
                                        className="max-w-full max-h-full object-contain rounded-lg"
                                    />
                                )}
                            </div>

                            {selected && (
                                <div className="px-4 py-3 flex items-center justify-between bg-black/70">
                                    <div className="flex items-center gap-3">
                                        <Badge className={selected.mediaType?.startsWith('video/') ? 'bg-purple-600 text-white text-[10px]' : 'bg-blue-600 text-white text-[10px]'}>
                                            {selected.mediaType?.startsWith('video/') ? 'Video' : 'Image'}
                                        </Badge>
                                        <span className="text-gray-300 text-xs">{new Date(selected.timestamp).toLocaleString()}</span>
                                        <span className="text-gray-500 text-xs">{selectedIdx + 1} / {media.length}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(selected)}
                                        disabled={downloading === selected._id}
                                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                    >
                                        {downloading === selected._id ? (
                                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Download className="h-3.5 w-3.5" />
                                        )}
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-44 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 overflow-y-auto flex flex-row md:flex-col gap-2 p-2">
                            {media.map((item, idx) => (
                                <button
                                    key={item._id}
                                    onClick={() => { setSelected(item); setSelectedIdx(idx); }}
                                    className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                        selected?._id === item._id
                                            ? 'border-purple-500 shadow-md'
                                            : 'border-transparent hover:border-gray-300'
                                    }`}
                                    style={{ width: 80, height: 60 }}
                                    title={new Date(item.timestamp).toLocaleString()}
                                >
                                    {item.mediaType?.startsWith('video/') ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                            <Play className="h-4 w-4 text-white opacity-70" />
                                        </div>
                                    ) : (
                                        <img src={item.mediaUrl} alt="thumbnail" className="w-full h-full object-cover" />
                                    )}
                                    {idx === 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white text-[7px] px-1 rounded-bl font-bold">LATEST</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
