/*
=================================================================================================
       ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
       a responsabilidade deste componente é: exibir conteudo em tela
=================================================================================================
*/

// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW PARA EXIBIR A LISTA DE USUARIOS DA BASE

/*
demanda: como listar os dados de usuarios armazenados na base - exibindo na lista somente o nome de cada usuario?
*/

// importar os recursos necessários
import { Link } from 'react-router-dom';

// importar o reducer para este componente - porque é nele que se encontra as implementações logicas que manipulam a base de dados

import { useGetUsersQuery } from '../../reducers/userReducer.js';

/*
    1º passo: definir uma const para servir como expressão de função que executurá "mini-consultas" aos dados fazendo uso de props embarcadas em reduxjs. Essas props auxiliarão nas funcionalidades de carregamento, sucesso ao carregar os dados, verficação e exibição de erros - caso eles ocorram.
*/

const ListaUsuarios = () =>{
    //ListaUsuarios
    // 2º passo: indicar, aqui, o uso das props de reduxjs para trabalhar em segundo-plano e observar os pontos descritos acima : funcionalidades de carregamento, sucesso ao carregar os dados, verficação e exibição de erros - caso eles ocorram.
    const{
        // estas props são as apelidadas "mini-consultas"
        data: users,
        //carregando
        isLoading,
        // sucesso ao carregar
        isSuccess,
        // se der erro
        isError,
        // exibir o erro
        error
    } = useGetUsersQuery('getUsers') // indicamos para as "mini-consultas" a consulta que recupera todos os dados da nossa base

    // 3º passo: definir uma variavel let - o objetivo dessa variavel é receber como valor as props indicadas na const acima e, a partir da verificação de avaliação dessas props a view pode ser construida considerando qualquer um dos cenários que as props propporcionarem
    let conteudo

    // 4º passo: definir a primeira verificação da prop isLoading
    if(isLoading){
        conteudo = <p>Carregando...</p>
    }else if(isSuccess){
        // 4ºa passo: definir a view de lista
        const renderizarUsers = users.ids.map(
            userId =>(
                // retornar um registro de dado de cada vez
                <li key={userId}>
                    <Link to = {`/user/${userId}`}>
                        {users.entities[userId].name}
                    </Link>
                </li>
            )
         )

         // agora, é necessário fazer uso dos elementos <li></li> e compor a lista completa
         conteudo = (
            <section>
                <h2>Lista de usuarios da mini-rede de compartilhamento de conteudo</h2>
                <ul className="ListaUser">
                    {renderizarUsers}
                </ul>
            </section>
         )

    }else if(isError){
        conteudo = <p>{error}</p>
    }
    // retornar o valor da variavel conteudo para exibir na tela - seja qual for o valor que ela detém
    return conteudo
}

// exportar o componente
export default ListaUsuarios;