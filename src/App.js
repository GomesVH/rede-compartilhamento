import './App.css';

//importar o recurso de rotas
import { Routes, Route } from 'react-router-dom';

// importar componentes
import ListaUsuarios from './components/users/UsersLista.js';
import UserPosts from './components/users/UserPosts.js';
import CriarPost from './components/posts/comp-crud/CriarPost.js';
import EditarPost from './components/posts/comp-crud/EditarPost.js';
import LerPostUnico from './components/posts/comp-crud/LerPostUnico.js';
import PostLista from './components/posts/PostsLista.js';
import LayoutBase from './base-layout/layoutBase.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutBase />}>
        
        <Route index element={<PostLista />} />

        <Route path="user">
          <Route index element={<ListaUsuarios />} />
          <Route path=":userId" element={<UserPosts />} />
        </Route>

        <Route path="post">
          <Route index element={<CriarPost />} />
          <Route path="edit/:postId" element={<EditarPost />} />
          <Route path=":postId" element={<LerPostUnico />} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App;