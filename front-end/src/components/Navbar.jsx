// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const { id } = useAuth();
    const location = useLocation();

    // Función para determinar si un enlace está activo
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center text-xl font-bold text-blue-600"
                        >
                            <svg
                                className="w-8 h-8 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                            Red Social
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isActive("/")
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                }`}
                        >
                            <svg
                                className="w-5 h-5 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Inicio
                        </Link>

                        {!id ? (
                            <>
                                <Link
                                    to="/login"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isActive("/login")
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isActive("/register")
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <svg
                                        className="w-5 h-5 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                        />
                                    </svg>
                                    Registrarse
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/perfil"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isActive("/perfil")
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                                    }`}
                            >
                                <svg
                                    className="w-5 h-5 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Mi Perfil
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}