import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useAuth from "../hooks/useAuth";

export const PostCard = ({ post, onLike }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nuevoCom, setNuevoCom] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);
    const { id } = useAuth();

    useEffect(() => {
        setComments([]);
        setNuevoCom("");
    }, [post.id, showComments]);

    const handleLikeClick = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3000/likes/${post.id}/${id}`
            );
            setIsLiked(response.data.liked);
            setLikesCount(prev => response.data.liked ? prev + 1 : prev - 1);
        } catch (err) {
            console.error('Error al dar like:', err);
        }
    };

    useEffect(() => {
        const checkLikeStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/likes/${post.id}/${id}/check`
                );
                setIsLiked(response.data);
            } catch (err) {
                console.error('Error al verificar like:', err);
            }
        };

        if (id) {
            checkLikeStatus();
        }
    }, [post.id, id]);

    useEffect(() => {
        if (!showComments) return;

        const getComentarios = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:3000/comments/${post.id}`);
                setComments(res.data);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }; getComentarios()
    }, [showComments, post.id]);


    //agregar nuevo comentario, por ahora siempre el user 1
    const agregarComentario = async (e) => {
        if (nuevoCom.length === 0) return;

        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/comments/${post.id}`, {
                comments: nuevoCom,
                userId: Number(id),
            });
            setNuevoCom("");
            setComments([...comments, res.data])
        } catch (err) {
            console.error(err);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Ahora';
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
        if (diff < 604800) return `${Math.floor(diff / 86400)}d`;

        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-5">
                <div className="flex items-start mb-4">
                    <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {post.user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">{post.user.username}</h3>
                            <span className="text-xs text-gray-500 ml-2">{formatDate(post.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 mt-2 whitespace-pre-line">{post.content}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={handleLikeClick}
                        className={`flex items-center transition-colors ${
                            isLiked 
                                ? 'text-red-600 hover:text-red-700' 
                                : 'text-gray-600 hover:text-red-600'
                        }`}
                    >
                        <svg 
                            className="w-5 h-5 mr-1" 
                            fill={isLiked ? "currentColor" : "none"} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="text-sm">{likesCount}</span>
                    </button>

                    <button
                        onClick={() => setShowComments(true)}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm">Comentarios</span>
                    </button>
                </div>
            </div>

            {/* Modal de Comentarios */}
            {showComments && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">Comentarios</h3>
                            <button
                                onClick={() => {
                                    setShowComments(false);
                                    setNuevoCom("");
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {loading && (
                                <div className="flex justify-center py-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                                    Error al cargar comentarios
                                </div>
                            )}

                            {!loading && !error && (
                                <div className="space-y-4">
                                    {comments.length === 0 ? (
                                        <p className="text-center text-gray-500 py-4">No hay comentarios aún</p>
                                    ) : (
                                        comments.map((com) => (
                                            <div key={com.id} className="bg-white rounded-lg p-3 shadow-sm">
                                                <div className="flex items-start">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                                                        {com.user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-baseline">
                                                            <h4 className="text-sm font-semibold text-gray-800">{com.user.username}</h4>
                                                        </div>
                                                        <p className="text-gray-700 text-sm mt-1">{com.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        <form onSubmit={agregarComentario} className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={nuevoCom}
                                    onChange={(e) => setNuevoCom(e.target.value)}
                                    placeholder="Escribe un comentario..."
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                                    disabled={nuevoCom.length === 0}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}