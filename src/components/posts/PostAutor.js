/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ EM EXIBIR O USUARIO QUE CRIA/CRIOU DETERMINADO POST

/*
demanda: como implementar esta demanda?
*/

// fazer as importações necessárias
import { useGetUsersQuery } from '../../reducers/userReducer.js';
import { Link } from 'react-router-dom';

// 1º passo: definir a const para assumir o papel do componente
const PostAutor = ({ userId }) => {
    // 2º passo: definir um const para receber como valor o hook que auxiliará na busca dos dados da base
    const{user: autor} = useGetUsersQuery('getUsers', {
        selectFromResult: ({data, isLoading}) => ({
            user: data?.entities[userId]
        })
    })

    // 3º passo: construir a view - usando o operador ternario ? : == "(?)if- (:)else implicito"
    return <span>
            escrito por {autor ? <Link to={`/user/${userId}`}>{autor.name}</Link> : 'Autor desconhecido'}
         </span>
    
}

// exportar o componente
export default PostAutor;