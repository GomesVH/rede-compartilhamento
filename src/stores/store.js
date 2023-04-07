// a store é responsavel por armazenar os states da aplicação
// aqui, será indicado - para toda a aplicação - que a apiAction é, essencialmente, um middleware

// importar recursos necessários
import { configureStore } from "@reduxjs/toolkit";

// importar a action
import { apiAction } from '../actions/apiAction.js'

// definir uma const para receber como valor a configuração da store
export const store = configureStore({
    reducer: {
        [apiAction.reducerPath]: apiAction.reducer
    },
    /*
        a nossa apiAction foi "reduzida" à uma "coisa" só. Que coisa é essa?
        R: a camada intermediaria - comunicando front e back-end - entre os "pedaços" da aplicação
    */
   // a linha abaixo define a apiAction - e seus "agregados" - como a camada-do-meio do app
   middleware: getDefaultMiddleWare => getDefaultMiddleWare().concat(apiAction.middleware)
})