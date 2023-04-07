/*
=================================================================================================
       ESTE COMPONENTE É STATEFUL - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
       a responsabilidade deste componente é: exibir conteudo em tela E
       OFERECER PARA A APLICAÇÃO UMA MUDANÇA DE ESTADO => QUANDO UM FORMULÁRIO
       ESTÁ VAZIO, É ENTÃO, PREENCHIDO COM DADOS E ESTES DADOS SÃO ENVIADOS PARA UMA BASE
       DE ARMAZENAMENTO - DESSA FORMA A APLICAÇAO "GANHA" UM NOVO
       ESTADO (SEM DADOS/COM DADOS)
=================================================================================================
*/

// ESTE COMPONENTE É RESPONSAVEL POR AUXILIAR NO PROCESSO DE INSERÇÃO DE DADOS DE UM NOVO POST NA BASE

// como implementar esta estrutura?

// 1º passo: fazer as importações necessarias 
import { useAddNewPostMutation } from '../../../reducers/postReducer.js';

import { useGetUsersQuery } from '../../../reducers/userReducer.js';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// 2º passo: definir uma const para iniciar o processo de construção/implementação de um formulario para o preenchimento de seus inputs e enviar para a base armazenando o registro de post

const CriarPost = () =>{
    // 3º passo: definir uma nova const para receber como valor o hook de adição de um novo registro na base 
    const[addNewPost, {isLoading}] = useAddNewPostMutation() 

    //3ºb passo: definir a const para receber como valor o hook que auxilia na recuperação dos dados da base users[]
    const { data: users, isSuccess} = useGetUsersQuery('getUsers')

    // 4º passo: deifinir um "elenco" de consts para receber como valor os recursos que já foram, acima, devem ser atribuidos a propriedades "operacionais" e inicializados 
    const navegacao = useNavigate()

    // 4ºb passo: criar as consts para lidar com as alterações de state do componente
    const[title, setTitle] = useState('')
    const[content, setContent] = useState('')
    const[userId, setUserId] = useState('')
    
    // 4ºc passo: descrever como será feitp o uso de setTitle, setContent e setUserId com useState para a configuração de alteração do state do componente
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    //5º passo: definir uma const para operar como "embalagem" para manter os valores das propriedades que serão salvas na base dentro de um mesmo conjunto de dados
    // é necessario criar um array para receber os valores dos inputs e, mais tarde, "desmontar" este array e serializar os dados para envia-los à base.
    const salvarVals = [title, content, userId].every(Boolean) && !isLoading  // false

    // 6º passo: definir uma const para que de forma assincrona - explicitamente -, seja implementada a tentativa de salvamento dos dados oriundos dos inputs da view
    const clicarSalvarDados = async () =>{
        // determinar a verificação da propriedade const salvarVals
        if(salvarVals){
            // usando a assincronicidade, temtar criar um novo registro
            try{
                await addNewPost({
                    title, 
                    body: content,
                    userId
                }).unwrap()// aqui, o array de dados é "desmonatar" e serializado; este método cria uma unica linha de dados e, agora, é possivel salvar na base 
                setTitle('')
                setContent('')
                setUserId('')
                navegacao('/')
            }catch(err){
                // exibir o erro via console
                console.error('Falha ao salvar/Criar o post.', err)
            }
        }
    }

    // iniciar a construção da view

    //7º passo: definir uma variavel let 
    let selecionarUser 

    // 8º passo: esta variavel auxiliara no mapeamento dos valores de usuarios recuperados na base para que seja possivel escolher um user para ser autor de determinado post 
    if(isSuccess){
        selecionarUser = users.ids.map(
            id => (
                <option key={id} value={id}>
                    {users.entities[id].name}
                </option>
            ) 
        )
    }

    // 9º passo: retornar o restante da composição da view
    return(
        <section>
            <h2>Compartilhe um post</h2>
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
                     onClick = {clicarSalvarDados}
                     disabled = {!salvarVals} 
                >Salvar Post</button>
            </form>
        </section>
    )

} 

// exportar o componente
export default CriarPost;