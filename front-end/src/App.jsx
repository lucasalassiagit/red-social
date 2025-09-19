import  {PostList}  from "./pages/PostList";
import { Routes, Route } from "react-router-dom";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import  EditarPerfil  from "./components/EditarPerfil";

function App() {
  return <>
  <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<PostList />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/perfil" element={<Perfil/>} />
    <Route path="/register" element={<Register/>}></Route>
    <Route path="/editar-perfil" element={<EditarPerfil/>}></Route>
  </Routes>
 </>;
}

export default App;
