/*
    ESTE ARQUIVO SERÁ COMPOSTO POR UMA SÉRIE DE INSTRUÇÕES LÓGICAS - COMO ATUARÁ COMO UMA ESTRUTURA DE CONTROLE PARA A MANIPULAÇÃO DE DADOS RECUPERADOS DA BASE. SERÁ UMA EXTENSÃO DA apiAction
*/

// importar os recursos necessários
import { createEntityAdapter } from "@reduxjs/toolkit";
/*
    auxiliar na criação de uma "representação" do conteudo que está armazenado na base de dados. Se for uma base de dados relacional criará uma representação de uma tabela; se for uma base não-relacional criará uma "representação" de uma sequencia de registros armazenados num objeto json dentro de um documento - no formato json
*/
import { apiAction } from '../actions/apiAction.js';

// 1º passo: definir uma const para receber como valor o recurso createEntityAdapter - com o objetivo de disponibilizar a representação da base para a manipulação

const usersAdapter = createEntityAdapter()

// 2º passo: definir o state/estado inicial do componente
const stateInicial = usersAdapter.getInitialState()


/*
    3º passo: consiste em acessar a base que armazena os dados referentes - unica e exclusivamente -  aos usuarios da aplicação. Como fazer isso? ´É necessario recuperar todos os dados de usuario e disponibilizar para o front da aplicação. Para isso serão usados recursos embarcados da dependencia reduxjs e a apiAction ja definida anteriormente.
*/

// o método injectEndpoints nos da possibilidade de criar o "complemento" da baseUrl para acessar especificamente os dados de users[]
export const extendedApiActionUsers = apiAction.injectEndpoints({
    // http://localhost:3500/users
    // 3ºa passo: fazer uso da propriedade builder para criar o endpoint exclusivo para acesso a base de usuarios
    endpoints: builder => ({
        // 3ºb passo: vamos nomear as consulta
        getUsers: builder.query({ // getUsers recupera todos os registros da base user[{}]
            query: () => '/users',
            /*
                até aqui -  o passo 3 - os dados somente foram acessados passaram a ficar a disposição da aplicação. E agora? O que queremos fazer com estes dados acessados da base?
                Queremos exibi-os numa estrutura de lista na view.
                Como fazer isso?

                4º passo: será necessário dar um formato para este conjunto de dados - criar um processo de transformação. Para que seja possivel fazer a view consumir adequadamente cada um destes dados.
                Para criar o processo, vamos implementar um callback - retorno de chamada de função (uma função que chama outra função e.....)
                O formato indicado para estes dados é o formato de array
            */
           transformResponse: formatoDados => {
            // 5º passo: aqui, será estabelecida a tarefa assincrona que será responsavel por definir o array de dados que será consumido an view - esta instrução é um callback
            return usersAdapter.setAll(stateInicial, formatoDados)
           },
           providesTags: (result, error, arg) =>[
            { type: 'User', id: "LIST"},
            ...result.ids.map(
                id => ({type: 'User', id})
            ) // spread operator

            ]
        })
    })
})

// 6º passo: exportar a const - principio da redução 
export const {useGetUsersQuery} = extendedApiActionUsers