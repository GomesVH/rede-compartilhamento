/*
=================================================================================================
       ESTE COMPONENTE É STATEFUL - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
       a responsabilidade deste componente é: exibir conteudo em tela E
       OFERECER PARA A APLICAÇÃO UMA MUDANÇA DE ESTADO => QUANDO UM FORMULÁRIO
       ESTÁ COMPOSTO POR DADOS JA EXISTENTES E JA ARMAZENADOS NA BASE, É ENTAO, POSSIVEL ALTERAR ESTES DADOS E, ASSIM, PODEM SER ENVIADOS 
       PARA UMA BASE DE ARMAZENAMENTO - DESSA FORMA A APLICAÇÃO "GANHA" UM NOVO ESTADO (COM DADOS ATUAIS/COM DADOS ALTERADOS)
=================================================================================================
*/

// ESTE COMPONENTE É RESPONSAVEL POR AUXILIAR NO PROCESSO DE INSERÇÃO DE DADOS DE UM NOVO POST NA BASE

// como implementar esta estrutura?

// 1º passo: fazer as importações necessarias 
import { useUpdatePostMutation, useDeletePostMutation } from '../../../reducers/postReducer.js';

import { useGetUsersQuery } from '../../../reducers/userReducer.js';
import { useGetPostsQuery } from '../../../reducers/postReducer.js';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// 2º passo: definir uma const para iniciar o processo de construção/implementação de um formulario para o preenchimento de seus inputs e enviar para a base armazenando o registro de post

const EditarPost = () =>{
    // 3º passo: definir uma const fazer so hook useParams() para referenciar qual é o elemento principal de identificação do registro de post
    const{postId} = useParams()
    const navegacao = useNavigate()

    // 3ºb passo: definir uma nova const para receber como valor o hook de atualizaçãodos dados e exclusão dos dados de registro na base 
    const[ updatePost, {isLoading}] = useUpdatePostMutation()
    const[deletepost] = useDeletePostMutation() 

    //3ºc passo: definir a const para receber como valor o hook que auxilia na recuperação dos dados da base users[]
    const { data: users, isSuccess: isSuccessUsers } = useGetUsersQuery('getUsers')

    // 3ºd passo: definir a const para receber como valor o hook que auxilia na recuperação dos dados da base posts[]
    const{
        post,
        isLoading: isLoadingPosts,
        isSuccess
    } = useGetPostsQuery(
        'getPosts',{
            selectFromResult: ({ data, isLoading, isSuccess}) => ({
                post: data?.entities[postId],
                isLoading,
                isSuccess
            })
        })

    // 4º passo: deifinir um "elenco" de consts para receber como valor os recursos que já foram, acima, devem ser atribuidos a propriedades "operacionais" e inicializados, criar as consts para lidar com as alterações de state do componente
    const[title, setTitle] = useState('')
    const[content, setContent] = useState('')
    const[userId, setUserId] = useState('')

    // 4ºb passo: fazer uso do useEffect()
    useEffect(() =>{
        if(isSuccess){
            setTitle(post.title)
            setContent(post.body)
            setUserId(post.userId)
        }
    }, [isSuccess, post?.title, post?.body, post?.userId])
    
    // 4ºc passo: descrever como será feitp o uso de setTitle, setContent e setUserId com useState para a configuração de alteração do state do componente
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    // 5º passo: verificar com a "mini-consulta" isLoadingPosts se esta tudo carregado
    if(isLoadingPosts) return <p>Carregando</p>

    if(!post){
        return(
            <section>
                <h2>Post não encontrado!</h2>
            </section>
        )
    }

    //5ºb passo: definir uma const para operar como "embalagem" para manter os valores das propriedades que serão salvas na base dentro de um mesmo conjunto de dados
    // é necessario criar um array para receber os valores dos inputs e, mais tarde, "desmontar" este array e serializar os dados para envia-los à base.
    const salvarVals = [title, content, userId].every(Boolean) && !isLoading  // false

    // 6º passo: definir uma const para que de forma assincrona - explicitamente -, seja implementada a tentativa de salvamento dos dados oriundos dos inputs da view
    const clicarSalvarPost = async () =>{
        // determinar a verificação da propriedade const salvarVals
        if(salvarVals){
            // usando a assincronicidade, temtar criar um novo registro
            try{
                await updatePost({
                    id: post?.id,
                    title, 
                    body: content,
                    userId
                }).unwrap()// aqui, o array de dados é "desmonatar" e serializado; este método cria uma unica linha de dados e, agora, é possivel salvar na base 
                setTitle('')
                setContent('')
                setUserId('')
                navegacao(`/post/${postId}`)
            }catch(err){
                // exibir o erro via console
                console.error('Falha ao atualizar o post.', err)
            }
        }
    }

    // iniciar a construção da view

    //7º passo: definir uma variavel let 
    let selecionarUser 

    // 8º passo: esta variavel auxiliara no mapeamento dos valores de usuarios recuperados na base para que seja possivel escolher um user para ser autor de determinado post 
    if(isSuccessUsers){
        selecionarUser = users.ids.map(
            id => (
                <option key={id} value={id}>
                    {users.entities[id].name}
                </option>
            ) 
        )
    }

    // 8ºb passo: definir a ação e exclusão de um registro - desde que esteja na base e seja devidamente identificado 
    const clicarExcluirPost = async () => {
        try{
            await deletepost({id: post?.id}).unwrap()

            setTitle('')
            setContent('')
            setUserId('')

            navegacao('/')
        }catch(err){
            console.error('Falha ao excluir o post.', err)
        }
    }

    // 9º passo: retornar o restante da composição da view
    return(
        <section>
            <h2>Atualizar post</h2>
            <form>
                <label htmlFor="postTitle">Titulo do post</label>
                <input
                    type = "text"
                    id = "postTitle"
                    name = "postTitle"
                    value = {title}
                    onChange = {onTitleChanged}
                />

                <label htmlFor="postAuthor">Autor</label>
                <select id = "postAuthor" value={userId} onChange = {onAuthorChanged}>
                    <option value = ""></option>
                    {selecionarUser}
                </select>

                <label htmlFor="postContent">Conteudo do post</label>
                <textarea 
                    id = "postContent"
                    name = "postContent"
                    value = {content}
                    onChange = {onContentChanged}
                />

                <button
                     type = "button"
                     onClick = {clicarSalvarPost}
                     disabled = {!salvarVals} 
                >Salvar Post</button>

                <button 
                   type="button"
                   className = "deleteButton"
                   onClick = {clicarExcluirPost}
                >
                    Excluir Post
                </button>
            </form>
        </section>
    )

} 

// exportar o componente
export default EditarPost;