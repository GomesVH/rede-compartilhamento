/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW PARA EXIBIR UM ÚNICO POST - DA BASE - PARA SER EXIBIDO

/*
demanda: como exibir um unico post armazenado na base?
*/

// 1º passo: importar os recursos necessários
import {useParams, Link} from 'react-router-dom';
import { useGetPostsQuery } from '../../../reducers/postReducer.js'; 
import BotoesReactions from '../BotoesReactions.js';
import PostAutor from '../PostAutor.js';
import PostData from '../PostData.js';

// 2º passo: definição da const que será o componente
const LerPostUnico = () => {
    // 3º passo: definição de uma nova const para receber como valor o hook useParams()
    const{postId} = useParams()

    // 4º passo: definir uma nova const para  receber como valor o hook que auxilia na recuperação dos dados da base
    const{ post, isLoading } = useGetPostsQuery('getPost', {
        selectFromResult: ({data, isLoading}) => ({
            post: data?.entities[postId],
            isLoading
        })
    })

    // 5º passo: verificar se o acesso as dados ocorreu
    if(isLoading) return <p>Carregando... </p>

    // 5ºb passo: se os dados não foram acessados
    if(!post){
        return(
            <section>
                <h2>Post não encontrado!</h2>
            </section>
        )
    }

    // 6º passo: construir o restante da view
    return(
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className = "creditosPost">
                <PostAutor userId={post.userId} />
                <Link to={`/post/edit/${post.id}`}>Editar Post</Link>
                <PostData timestamp={post.date} />
            </p>            
            <BotoesReactions post={post} />
        </article>
    )
}

// 7º passo: exportar o componente
export default LerPostUnico;