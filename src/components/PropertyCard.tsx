
import React from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Property } from "../lib/api";

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    const { id, title, price, bhk, area, location, eco_score, thumbnail_url } = property;
    const img = thumbnail_url || `/images/${id}.jpg` || "/placeholder.jpg";

    return (
        <Link href={`/property/${id}`} className="no-underline block group h-full">
            <Card className="h-full glass-panel border-0 hover:shadow-neon hover:-translate-y-2 transition-all duration-300 rounded-3xl overflow-hidden group flex flex-col bg-transparent">
                {/* Image Section */}
                <div className="relative w-full h-72 overflow-hidden">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90"></div>

                    {eco_score && (
                        <div className="absolute top-4 right-4">
                            <Chip
                                label={`Eco Score: ${eco_score}`}
                                size="small"
                                className="bg-green-500/20 backdrop-blur-md text-green-300 font-bold border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                            />
                        </div>
                    )}

                    <div className="absolute bottom-4 left-6 text-white z-10">
                        <Typography variant="h6" className="font-extrabold drop-shadow-lg leading-tight text-white mb-1 group-hover:text-neon-cyan transition-colors">
                            {title}
                        </Typography>
                        <p className="text-sm text-gray-300 flex items-center gap-1 font-medium">
                            📍 {location ?? "Location N/A"}
                        </p>
                    </div>
                </div>

                <CardContent className="p-6 flex-grow flex flex-col relative z-20">
                    <div className="flex justify-between items-end mb-6">
                        <div style={{ position: 'relative', zIndex: 50 }}>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#00f3ff', opacity: 1, textShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }}>Price</p>
                            <div style={{ backgroundColor: '#00f3ff', padding: '4px 12px', borderRadius: '8px', display: 'inline-block', boxShadow: '0 0 10px rgba(0, 243, 255, 0.4)' }}>
                                <Typography variant="h5" component="div" className="font-black tracking-tight" style={{ color: '#000000', opacity: 1 }}>
                                    ₹{Number(price).toLocaleString()}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-white/10">
                        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white shadow-lg">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Config</span>
                            <span className="font-black text-black flex items-center gap-2 mt-1 text-lg">
                                🛏️ {bhk} BHK
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white shadow-lg">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Area</span>
                            <span className="font-black text-black flex items-center gap-2 mt-1 text-lg">
                                📐 {area} sqft
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                        <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-neon-cyan hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-neon transition-all text-sm text-center cursor-pointer uppercase tracking-wider transform group-hover:scale-[1.02]">
                            Book Site Visit
                        </div>
                        <div className="w-full bg-white/5 border border-white/10 text-gray-500 font-bold py-3 rounded-xl text-xs text-center cursor-not-allowed uppercase tracking-wider flex items-center justify-center gap-2">
                            <span>👓</span> Virtual Tour (Coming Soon)
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
