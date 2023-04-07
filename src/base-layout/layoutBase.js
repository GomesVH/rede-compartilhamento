/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW PARA EXIBIR A ESTRUTURA-BASE DE LAYOUT/INTERFACE DA APLICAÇÃO


//  COMO IMPLEMENTAR ESTA DEMANDA

// importar os recursos necessários
import ToolBar from "./ToolBar.js";
import { Outlet } from 'react-router-dom';

// 1º passo: definir a const para assumir o papel de componente
const LayoutBase = () => {
    // construir a view-base do comp
    return(
        // <></> par de tags vazias == significa que existe um React Fragment 
        <>
            <ToolBar />
            <main className="App">
                 <Outlet />
            </main>
        </>
    )

}

// exportar o componente 
export default LayoutBase;