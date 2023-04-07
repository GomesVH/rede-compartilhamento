/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/

// ESTE É O COMPONENTE RESPONSAVEL POR EXIBIR UMA LISTAGEM DE POSTS REFERENTES A UM UNICO USUARIO DA REDE
// como implementar este cenário?
// importar os recursos ncessários
import {useGetPostsByUserIdQuery} from '../../reducers/postReducer.js';
import {useGetUsersQuery} from '../../reducers/userReducer.js';
import {Link, useParams} from 'react-router-dom';

// 1º passo: definir uma const para receber as "mini-consultas" e verificar se o parametro que identifica o usuario faz com que estes dados - usuarios - sejam carregados e acessado
const UserPosts = () =>{
    // 1ºb passo: definir uma nova const para receber o recurso que auxiliar na identificação dos usuarios
    const{userId} = useParams()

    // 1ºc passo: verificar, passo-a-passo, se existem usuarios - só pode existir um post se existir, ao menos, um usuario
    const{
        user,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser
    } = useGetUsersQuery('getUsers', {
        selectFromResult: ({
            data, isLoading, isSuccess, isError, error
        }) => ({
            user: data?.entities[userId],
            isLoading,
            isSuccess,
            isError,
            error
        })
    })

    // 2º passo: definir a const com as "mini-consultas" para verificar a existencia de posts
    const{
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
       } = useGetPostsByUserIdQuery(userId)
    
    // 3º passo: construir a view
    let conteudo

    if(isLoading || isLoadingUser){
        conteudo = <p>Carregando...</p>
    }else if(isSuccess && isSuccessUser){
        // definir uma const para receber como valor a prop postForUser
        const{ids, entities} = postsForUser

        conteudo = (
            <section>
                <h2>{user?.name}</h2>
                <ol>
                    {
                        ids.map(
                            id => (
                               <li key={id}>
                                <Link to = {`/post/${id}`}>
                                    {entities[id].title}
                                </Link>
                               </li>
                            )
                        )
                    }
                </ol>
            </section>
        )
    }else if(isError || isErrorUser){
        conteudo = <p>{error || errorUser}</p>
    }
    return conteudo
}

//4º passo: exportar o componente
export default UserPosts;