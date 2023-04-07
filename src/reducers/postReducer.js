/*
    ESTE ARQUIVO SERÁ COMPOSTO POR UMA SÉRIE DE INSTRUÇÕES LÓGICAS - COMO ATUARÁ COMO UMA ESTRUTURA DE CONTROLE PARA A MANIPULAÇÃO DE DADOS RECUPERADOS DA BASE. SERÁ UMA EXTENSÃO DA apiAction - esta estrutura de controle está direcionada para os dados de posts
*/

// importar os recursos necessários
import { createEntityAdapter } from "@reduxjs/toolkit";

// importar a action
import { apiAction } from '../actions/apiAction.js';

// importar o recurso que auxiliará na geração das datas de criação dos posts
import {sub} from 'date-fns';

// 1º passo: definir uma const para receber como valor o recurso createEntityAdapter - com o objetivo de disponibilizar a representação da base para a manipulação

const postsAdapter = createEntityAdapter({
    // descrever o procedimento com o qual os posts serão devidamente organizados e exibidos em tela
    sortComparer: (a, b) => b.date.localeCompare(a.date)
    //sortComparer: (a, b) => b.date.localCompare(a.date)
})

// 2º passo: definir o state/estado inicial do componente
const stateInicial = postsAdapter.getInitialState()

/*
    3º passo: consiste em acessar a base que armazena os dados referentes - unica e exclusivamente -  aos posts da aplicação. Como fazer isso? ´É necessario recuperar todos os dados de posts e disponibilizar para o front da aplicação. Para isso serão usados recursos embarcados da dependencia reduxjs e a apiAction ja definida anteriormente.
*/

/*
========================================================================================
            INICIO DA CONSTRUÇÃO DAS OPERAÇÕES CRUD DA APLICAÇÃO
           Create, Read, Update, Delete aplicados aos dados de post
========================================================================================

*/

// 1ª OPERAÇÃO CRUD - LER OS DADOS DE POSTS ARMAZENADOS NA BASE

// o método injectEndpoints nos da possibilidade de criar o "complemento" da baseUrl para acessar especificamente os dados de posts[]
export const extendedApiActionPosts = apiAction.injectEndpoints({
    // http://localhost:3500/posts
    // 3ºa passo: fazer uso da propriedade builder para criar o endpoint exclusivo para acesso a base de posts
    endpoints: builder =>({ // getPosts recupera todos os registros da base posts[{}]
        // nomeando a consulta
        getPosts: builder.query({
            query: () => '/posts',
            /*
                até aqui -  o passo 3 - os dados somente foram acessados passaram a ficar a disposição da aplicação. E agora? O que queremos fazer com estes dados acessados da base?
                Queremos exibi-os numa estrutura de lista na view.
                Como fazer isso?

                4º passo: será necessário dar um formato para este conjunto de dados - criar um processo de transformação. Para que seja possivel fazer a view consumir adequadamente cada um destes dados.
                Para criar o processo, vamos implementar um callback - retorno de chamada de função (uma função que chama outra função e.....)
                O formato indicado para estes dados é o formato de array
            */
           transformResponse: responseData => {
            // 4ºa passo: definir uma variavel para receber um valor inicial que será incrementado posteriormente
            let min = 1

            // 4ºb passo: definir const para mapear os registros de posts criados por um usuario
            const postsCarregados = responseData.map(
                post => {
                    /* 4ºc passo: aqui, será verificado a existencia de um post.. se existe, receberá uma data "nascimento", se não, não possibilidade de associar uma data 
                    */
                   if(!post?.date) post.date = sub(new Date(), {
                    minutes: min++}).toISOString()
                    // 4ºd passo: aqui, será verificado a existencia de um post.. se existe, receberá um conjunto de props que armazenará a contagem de reações que um leitor indicou - interagindo com botoes -, se não, não há possibilidade de associar nenhuma reação
                    if(!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post
                }
                
            )
            return postsAdapter.setAll(stateInicial, postsCarregados) 
           },
           providesTags:(result, error, arg) =>[
                {type: 'Post', id:"LIST"},
                ...result.ids.map(id => ({type: 'Post', id}))
           ]
        }),
        // 2ª OPERAÇÃO CRUD - RECUPERAR DADOS DE POST A PARTIR DE UM USUARIO ESPECIFICO

        // 5º passo: serão recuperados os posts referentes a cada usuario da aplicação
        getPostsByUserId: builder.query({
            // 5ºa passo: criar a consulta que recupera os dados de um unico usuario a partir da identificação deste
            query: id => `/posts/?userId=${id}`,

            // 5ºb passo: agora, será preciso dar um formato aos dados recuperados
            transformResponse: responseData => {
                let min
                const postsCarregadosUsers = responseData.map(
                    post => {
                        if(!post?.date) post.date = sub(new Date(),
                        {minute: min++}).toISOString()
                        if(!post?.reactions) post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                        return post
                     }
                )
                return postsAdapter.setAll(stateInicial, postsCarregadosUsers)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({type: 'Post', id}))
            ]
        }),

        // 3ª OPERAÇÃO CRUD - CRIAR/INSERIR UM NOVO REGISTRO DE DADOS DE POST NA BASE

        //6º passo: definir a consulta de Inserção de dados - CREATE
        addNewPost: builder.mutation({
            // criar o contexto de inserção de um novo registro e alteração/mutação
            query: initialPost => ({
               url: '/posts',
               method: 'POST',
               body: {
                // body nada mais é que o conteudo/corpo do post
                ...initialPost,
                userId: Number(initialPost.userId),
                date: new Date().toISOString(),
                reactions: {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
               }
            }),
            //6ºb passo: executar o fechamento do "pacote" de alterações/mutações/ tarefas indicadas pela consulta acima
            invalidatesTags: [
                {type: 'Post', id: "LIST"}
            ]
        }),
        // 4ª OPERAÇÃO CRUD - ATUALIZAR/ALTERAR UM REGISTRO DA BASE, DEVIDAMENTE IDENTIFICADO

        // 7º passo: implementação da consulta de atualização/mutação/update de dados de registros existentes 
        updatePost: builder.mutation({
            query: initialPost => ({
                // é necessário recuperar o dado - devidamente identificado - para que seja alterado
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            }),
            //7ºb passo: executar o fechamento do "pacote" de alterações/mutações/ tarefas indicadas pela consulta acima
            invalidatesTags: (result, error, arg) => [
                {type: 'Post', id:arg.id}
            ]
        }),
        // 5ª OPERAÇÃO CRUD - EXCLUIR UM REGISTRO DEVIDAMENTE IDENTIFICADO
        // 8º passo: implementação da estrutura lógica para a exclusão de um registros - desde que estja devidamente identificado
        deletePost: builder.mutation({
            // construção da consulta de exclusão
            query: ({id}) => ({ 
                url: `/posts/${id}`,
                method: 'DELETE',
                body: {id}
                }),
        // 8ºb passo: executar o fechamento do "pacote" de alterações/mutações/ tarefas indicadas pela consulta acima
        invalidatesTags: (result, error, arg) => [
            {type: 'Post', id: arg.id}
            ]
        }),

    // 9º passo: criar a dinamica/fluxo de alteração do state de cada botão de reação que será implementado em seu devido componente
    addReaction: builder.mutation({
      // construir a consulta
      query: ({postId, reactions}) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: {reactions}
      }),
    // 10º passo: tornar a alteração das reactions, explicita. E o dispatch indicara  - para o armazenamento na store - as alterações de state da aplicação 
    async onQueryStarted({postId, reactions}, {dispatch, queryFulfilled}){
        // definir uma const para receber como valor o método dispatch
        const patchResult = dispatch(
            // o 1º parametro 'getPosts' indica que as consultas assincronas devem acontecer se, e somente se, os dados já estiverem a disposição da aplicação
            // o 2º parametro 'getPosts, indica que - uma vez que os dados estão a disposição da aplicação - deve ser gerado, a partir deste dados, uma cópia identica da consulta que resgata e resulta na obtenção dos dados dad base. Por que? R: Porque toda e qualquer alteração que ocorrer com qualquer um dos dados tem de ser manipulado a partir da "cópia".
            extendedApiActionPosts.util.updateQueryData('getPosts', 'getPosts',
                // definir uma arrow function para, a partir da entity as tarefas indicadas sejam executadas
                draft => { // definir o callback
                    const post = draft.entities[postId]
                    // verificando a existencia do post
                    if(post) post.reactions = reactions
                })
        )
        // definição da assincronicidade
        try{
            await queryFulfilled
        }catch{
            patchResult.undo()
        }
    } 

        }) 
    })  
}) 

// 11º passo: exportar as consts
export const{
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiActionPosts