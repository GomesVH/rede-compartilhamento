/*
================================================================================
        ESTE COMPONENTE É STATELESS - SEM MUDANÇA DE COMPORTAMENTO/ESTADO
          a responsabilidade deste componente é: exibir conteudo em tela
================================================================================
*/


// ESTE ARQUIVO É O COMPONENTE QUE SERÁ A VIEW PARA EXIBIR A ESTRUTURA DE LINKS DE NAVEGAÇÃO ENTRE OS COMPONENETES DO PROJETO

/*
  COMO IMPLEMENTAR ESTA DEMANDA
*/

// importar os recursos necessários
import { Link } from 'react-router-dom';

// 1º passo: definir uma const para assumir o papel de componente
const ToolBar = () => {
  <header className="header">
    <h2>R-Comp</h2>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="post">Criar Posts</Link></li>
        <li><Link to="user">Usuarios</Link></li>
      </ul>
    </nav>
  </header>
}

// exportar o componente
export default ToolBar;