import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const EditarPerfil = () => {
    const id = localStorage.getItem('id');
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleName = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!name) {
            setError("Por favor ingrese un nombre");
            return;
        }

        if(name === localStorage.getItem('name')){
            setError("El nombre no puede ser igual al actual");
            return;
        }

        try {
            await axios.put(`http://localhost:3000/users/${id}`, {
                name
            });
            setSuccess("Nombre actualizado correctamente");
            localStorage.setItem('name', name);
            setName("");
        } catch (Error) {
            setError(Error.response?.data || "Error al actualizar el nombre");
        }
    }

    

    const handleUsername = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!username) {
            setError("Por favor ingrese un nombre de usuario");
            return;
        }

        try{
            const res = await axios.get(
                `http://localhost:3000/users/buscar/username/${username}`
            );

            if (res.data === true) {
                setError("El nombre de usuario ya existe");
                return;
            }
        }catch(err){
            setError("Error al verificar el nombre de usuario");
        }

        try {
            await axios.put(`http://localhost:3000/users/${id}`, {
                username
            });
            setSuccess("Nombre de usuario actualizado correctamente");
            localStorage.setItem('username', username);
            setUsername("");
        } catch (Error) {
            setError(Error.response?.data || "Error al actualizar el nombre de usuario");
        }
    }

    const handleEmail = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email) {
            setError("Por favor ingrese un correo electrónico");
            return;
        }

        if(email === localStorage.getItem('email')){
            setError("El correo electrónico no puede ser igual al actual");
            return;
        }

        try{
            const res = await axios.get(
                `http://localhost:3000/users/buscar/email/${email}`
            );  
            if (res.data === true) {
                setError("El correo electrónico ya existe");
                return;
            }
        }catch(err){
            setError("Error al verificar el correo electrónico");
        }

        try {
            await axios.put(`http://localhost:3000/users/${id}`, {
                email
            });
            setSuccess("Correo electrónico actualizado correctamente");
            localStorage.setItem('email', email);
            setEmail("");
        } catch (Error) {
            setError(Error.response?.data || "Error al actualizar el correo electrónico");
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!password || !newPassword) {
            setError("Por favor complete todos los campos");
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/auth/VerificarPassword", {
                username: localStorage.getItem('username'),
                password: password
            });
            if (res.data === true && password !== newPassword) {
                await axios.put(`http://localhost:3000/users/${id}`, {
                    password: newPassword
                });
                setSuccess("Contraseña actualizada correctamente");
                setPassword("");
                setNewPassword("");
            }
            else if(password === newPassword){
                setError("La nueva contraseña no puede ser igual a la actual");
            } 
            else {
                setError("La contraseña actual es incorrecta");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error al actualizar la contraseña");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => navigate('/perfil')}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al perfil
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
                        <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar Perfil
                    </h1>
                    <p className="text-gray-600 mt-2">Actualiza tu información personal</p>
                </div>

                {/* Mensajes de estado */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}
                
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {success}
                        </div>
                    </div>
                )}

                {/* Formularios */}
                <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                    {/* Nombre */}
                    <form onSubmit={handleName} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Nombre
                        </h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Nuevo nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>

                    {/* Username */}
                    <form onSubmit={handleUsername} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            Nombre de usuario
                        </h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Nuevo nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={!username.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>

                    {/* Email */}
                    <form onSubmit={handleEmail} className="border-b border-gray-200 pb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Correo electrónico
                        </h3>
                        <div className="flex gap-4">
                            <input
                                type="email"
                                placeholder="Nuevo correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={!email.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>

                    {/* Password */}
                    <form onSubmit={handlePassword}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Cambiar contraseña
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <input
                                type="password"
                                placeholder="Nueva contraseña"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                disabled={!password.trim() || !newPassword.trim()}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Cambiar contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarPerfil;