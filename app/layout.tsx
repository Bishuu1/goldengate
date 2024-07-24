// app/layout.tsx
import React, { ReactNode } from "react";
import "./globals.css";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
            </head>
            <body>
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white shadow-md">
                        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold">
                                Unsplash Clone
                            </h1>
                            <nav>
                                <ul className="flex space-x-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            Explore
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            Collections
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                    <main className="flex-grow container mx-auto px-4 py-8">
                        {children}
                    </main>
                    <footer className="bg-gray-800 text-white py-4">
                        <div className="container mx-auto px-4">
                            <p>&copy; 2024 Unsplash Clone.</p>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    );
};

export default Layout;
