/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW PARA EXIBIR A LISTA DE POSTS DA BASE

/*
demanda: como listar os dados de posts armazenados na base - exibindo na lista somente o um trecho de cada post - composto com os dados de data, autor, e botoes de reação?
*/

// importar os recursos necessários
import { useGetPostsQuery } from '../../reducers/postReducer.js';
import PostTrecho from './PostTrecho.js';

// 1º passo: definir uma const para assumir o papel do componente
const PostsLista = () => {
    // 2º passo: definir a const para fazer uso da "mini-consultas"
    const{
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
        } = useGetPostsQuery('getPosts')

    // 3º passo: definir uma variavel let para receber como valor conteudos distintos verificados a partir do uso das "mini-consultas"
    let conteudo

    // 4º passo: fazer uso das "mini-consultas" para estruturar a view e exibir os dados de post 
    if(isLoading){
        conteudo = <p>Carregando...</p>
    }else if(isSuccess){
        conteudo = posts.ids.map(
            postId => <PostTrecho key={postId} postId = {postId} />
        )
    }else if(isError){
        conteudo = <p>{error}</p>
    }

    // 5º passo: construir/retornar a view
    return(
        <section>
            {conteudo}
        </section>
    )
}

// exportar o componente
export default PostsLista;