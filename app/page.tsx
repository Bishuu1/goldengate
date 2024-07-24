"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const photos = [
    {
        id: 1,
        url: "/image/photo-1.avif",
        title: "Golden Gate Bridge 1",
    },
    {
        id: 2,
        url: "/image/photo-2.avif",
        title: "Golden Gate Bridge 2",
    },
    {
        id: 3,
        url: "/image/photo-3.avif",
        title: "Golden Gate Bridge 3",
    },
    {
        id: 4,
        url: "/image/photo-4.avif",
        title: "Golden Gate Bridge 4",
    },
    {
        id: 5,
        url: "/image/photo-5.avif",
        title: "Golden Gate Bridge 5",
    },
    {
        id: 6,
        url: "/image/photo-6.avif",
        title: "Golden Gate Bridge 6",
    },
];

const HomePage: React.FC = () => {
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Golden Gate</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative bg-white shadow-md rounded-lg overflow-hidden mb-6"
                        onMouseEnter={() => setHoveredPhoto(photo.id)}
                        onMouseLeave={() => setHoveredPhoto(null)}
                    >
                        <div className="relative w-full">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-auto"
                            />
                            {hoveredPhoto === photo.id && (
                                <>
                                    <div className="absolute top-6 left-6">
                                        <img
                                            src="/icon.png"
                                            alt="icon"
                                            className="w-16 h-16"
                                        />
                                    </div>
                                    <span className="absolute bottom-2 left-2 flex items-center bg-gray-800 bg-opacity-40 p-2 rounded">
                                        <svg className="inline-block h-10 w-10 rounded-full">
                                            <circle
                                                cx="5"
                                                cy="5"
                                                r="50"
                                                fill="blue"
                                            />
                                        </svg>
                                        <div className="ml-2 text-white">
                                            Texto de ejemplo
                                        </div>
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="p-4 bg-white flex gap-2 flex-wrap">
                            <a
                                href="#"
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
                            >
                                tag 1
                            </a>
                            <a
                                href="#"
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
                            >
                                tag 2
                            </a>
                            <a
                                href="#"
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
                            >
                                tag 3
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
