import React, { useEffect, useState } from 'react'
import { PostCard } from '../components/PostCard'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const PostList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useAuth();
    const [nuevoPost, setNuevoPost] = useState("");
    const [posting, setPosting] = useState(false);

    const getPosts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/posts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPosts(res.data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPosts()
    }, []);

    const handlePublicar = async (e) => {
        e.preventDefault();
        if (nuevoPost.trim().length === 0) return;

        setPosting(true);
        try {
            await axios.post(`http://localhost:3000/posts`, {
                content: nuevoPost,
                userId: Number(id)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setNuevoPost("");
            await getPosts();
        } catch (err) {
            console.error(err);
            setError("Error al publicar. Intenta nuevamente.");
        } finally {
            setPosting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Cargando publicaciones...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="font-medium">Error al cargar las publicaciones</p>
                    <p className="text-sm">{error.message}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {!id ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-center">
                    <p>Debe iniciar sesión para ver las publicaciones</p>
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Publicaciones de mi red social
                    </h1>

                    {/* Formulario para crear nuevo post */}
                    <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
                        <form onSubmit={handlePublicar} className="space-y-4">
                            <div>
                                <label htmlFor="nuevoPost" className="block text-sm font-medium text-gray-700 mb-2">
                                    Crear nueva publicación
                                </label>
                                <textarea
                                    id="nuevoPost"
                                    placeholder="¿Qué estás pensando?"
                                    value={nuevoPost}
                                    onChange={e => setNuevoPost(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    rows="3"
                                    disabled={posting}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className={`text-xs ${nuevoPost.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {nuevoPost.length}/1000 caracteres
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={posting || nuevoPost.trim().length === 0 || nuevoPost.length > 1000}
                                    className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {posting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publicando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Publicar
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Lista de publicaciones */}
                    <div className="space-y-6">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl shadow-md">
                                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No hay publicaciones aún</h3>
                                <p className="mt-2 text-gray-600">Sé el primero en compartir algo.</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}