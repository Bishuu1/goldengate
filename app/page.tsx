"use client";
import React, { useState, useEffect } from "react";
import { scrapingPhotos } from "../scraping";
import { useWindowSize } from "@uidotdev/usehooks";

interface Author {
    username: string | undefined;
    profileImageUrl: string | undefined;
    twitter: string | undefined;
}

interface Photo {
    id: number;
    url: string;
    profileUrl: string;
    tags: string[];
    author: any;
}
interface HomePageProps {
    photos: Photo[];
}
const HomePage: React.FC<HomePageProps> = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
    const size = useWindowSize();

    useEffect(() => {
        async function getData() {
            const photos: Photo[] = await scrapingPhotos();
            setPhotos(photos);
        }
        getData();
    }, []);

    const getColumns = (photos: Photo[]) => {
        const columns = size.width >= 1024 ? 3 : size.width >= 768 ? 2 : 1;

        const columnArrays: Photo[][] = Array.from(
            { length: columns },
            () => []
        );
        photos.forEach((photo, index) => {
            columnArrays[index % columns].push(photo);
        });
        return columnArrays;
    };
    const columnsPhotos = getColumns(photos);
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Golden Gate</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {columnsPhotos.map((column, columnIndex) => (
                    <div key={columnIndex} className="space-y-6">
                        {column.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative bg-white shadow-md rounded-lg overflow-hidden mb-6"
                                onMouseEnter={() => setHoveredPhoto(photo.id)}
                                onMouseLeave={() => setHoveredPhoto(null)}
                            >
                                <div className="relative w-full">
                                    <img
                                        src={photo.url}
                                        alt="nada"
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
                                                {photo.author
                                                    .profileImageUrl && (
                                                    <img
                                                        src={
                                                            photo.author
                                                                .profileImageUrl
                                                        }
                                                        alt={
                                                            photo.author
                                                                .username
                                                        }
                                                        className="inline-block h-10 w-10 rounded-full"
                                                    />
                                                )}
                                                <div className="ml-2 text-white">
                                                    {photo.author.username}
                                                </div>
                                                <div className="ml-2 text-white">
                                                    {photo.author.twitter}
                                                </div>
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="p-4 bg-white flex gap-2 flex-wrap">
                                    {photo.tags.map((tag, index) => (
                                        <a
                                            href="#"
                                            key={index}
                                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
                                        >
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
