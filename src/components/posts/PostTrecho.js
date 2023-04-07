/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE RESPONSAVEL POR RECEBER OS ELEMENTOS-COMPONENTES PARA COMPOR A ESTRUTURA DE UM TRECHO DE UM POST QUE, POSTERIORMENTE, FARÁ PARTE DE UMA LISTA DE TRECHOS DE POSTS

/*
demanda: como implementar esta demanda?
*/

// fazer as importações necessárias
import { useGetPostsQuery } from "../../reducers/postReducer.js";
import { Link } from 'react-router-dom';

// importar os componentes que, juntamente com o componente responsavel por extrair um trecho de um post, farão parte da listagem de posts, posteriormente
import BotoesReactions from "./BotoesReactions.js";
import PostAutor from "./PostAutor.js";
import PostData from "./PostData.js";

// 1º passo: definir uma const para assumir o papel do componente
const PostTrecho = ({ postId }) => {
    // 2º passo: criar uma nova const com o proposito de receber como valor o hook que auxiliará na recuperação dos de posts da base
    const { post } = useGetPostsQuery('getPosts', {
       selectFromResult: ({ data }) => ({
        post: data?.entities[postId]
       }) 
    })

    // 3º passo: construir/retornar a view
    return(
        <article>
            <h2>{post.title}</h2>
            <p className = "trecho">{post.body.substring(0, 65)}...</p>
            <p className = "postCredit">
                <PostAutor userId = {post.userId} />
                <Link to={`/post/${post.id}`}>Ler Post</Link>
                <PostData timestamp={post.date} />
            </p>
            <BotoesReactions post={post} />
        </article>
    )

}

// exportar o componente
export default PostTrecho;