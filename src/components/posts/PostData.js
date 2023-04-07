/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE RESPONSAVEL POR COMPOR A ESTRUTURA DE DATA DE CRIAÇÃO/ALTERAÇÃO DE CADA POST DA BASE

/*
demanda: como implementar esta demanda?
*/

// fazer as importações necessárias
import { parseISO, formatDistanceToNow } from 'date-fns';

// 1º passo: definir a const para assumir o papel do componente
const PostData = ({ timestamp }) => {
    // 2º passo: definir uma variavel que vai assumir - no devido momento - um valor especifico que pode indicar a data de criação/alteração de um post
    let umMomEspec = ''

    // 3º passo: definir uma estrutura de decisão para verificar o valor do parametro timestamp
    if(timestamp){
        const date = parseISO(timestamp)
        const periodo = formatDistanceToNow(date)
        umMomEspec = `${periodo} atras`
    }

    // 4º passo: construir/retornar a view
    return (
        <span title={timestamp}>
            &nbsp; <i>{umMomEspec}</i>
        </span>
    )
}

// exportar o comp
export default PostData;