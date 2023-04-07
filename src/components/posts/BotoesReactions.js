/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW DEFINIR OS ELEMENTOS GRAFICOS DE REAÇÃO DO USUARIO PARA SER EXIBIDO

/*
demanda: como exibir estes elementos em tela?
*/

// fazer as importações necessárias
import { useAddReactionMutation } from '../../reducers/postReducer.js';

// 1º passo: definir uma const para receber como valor os elementos graficos - icones - que serão transformados em botões
const iconesReactions = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

// 2º passo: definir uma const para assumir o papel do componente

const BotoesReactions = ({ post }) => {
    // 3º passo: definir uma nova const para receber como valor o hook auxilia na manipulação das reactions
    const [addReaction] = useAddReactionMutation()

    // 4ºa passo: definir uma nova const para "observar" as entradas de interação - se existirem - do usuario com cada botão de reação
    const criandoBotoesReactions = Object.entries(iconesReactions).map(([name, emoji]) => {
        // 4ºb passo: construir a view para "transformar" os icones em botões
        return(
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick = {
                    () => {
                        const novoValor = post.reactions[name] + 1
                        addReaction({
                            postId: post.id,
                            reactions: {...post.reactions, [name]: novoValor}
                        })
                    }
                }
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    // 5º passo: retornar esta criação de botões a partir dos icones de reação
    return <div>{criandoBotoesReactions}</div>
}

// exportar o componente
export default BotoesReactions;