// DEFINIR O 1º "PEDAÇO" DA CAMADA INTERMEDIARIA DA APLICAÇÃO - MIDDLEWARE - NOSSA API
// NESTE 1º "PEDAÇO" SERÁ DESCRITO COMO OS DADOS DA BASE DEVEM SER ACESSADOS

// fazer as importações necessárias - a partir da dependencia reduxjs/toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// definir e fazer uso do método createApi() com o proposito de estabelecer
// a base de "endereço" indicada para a recuperação/manipulação dos dados lá armazenados
export const apiAction = createApi({
    // definir o nome da action
    reducerPath: 'api',
    // indicar o "endereço" onde estão localizadas as bases de dados que serão operadas pela nossa aplicação
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500'
    }),
    // estas tags são por - temporariamente - armazenar nossos dados recuperados em cache
    tagTypes:['Post', 'User'],
    // http://localhost:3500/posts
    // http://localhost:3500/users
    endpoints: builder => ({})

})