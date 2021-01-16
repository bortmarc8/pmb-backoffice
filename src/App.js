import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import EventosView from './assets/js/EventosView.js';
import UsuariosView from './assets/js/UsuariosView.js';
import ApuestasView from './assets/js/ApuestasView.js';
import DSSView from './assets/js/DSSView.js';
import MercadosView from './assets/js/MercadosView.js';
//import MainMenu from './assets/js/mainMenu.js';

function App() {
  return (
    <div className="App">
      <div className={'mainMenu'}>
        <NavLink to={'/usuarios'}>
          <div className={'mainMenuButton'}>
            <h2>Usuarios</h2>
          </div>
        </NavLink>
        <NavLink to={'/apuestas'}>
          <div className={'mainMenuButton'}>
            <h2>Apuestas</h2>
          </div>
        </NavLink>
        <NavLink to={'/eventos'}>
          <div className={'mainMenuButton'}>
            <h2>Eventos</h2>
          </div>
        </NavLink>
        <NavLink to={'/mercados'}>
          <div className={'mainMenuButton'}>
            <h2>Mercados</h2>
          </div>
        </NavLink>
        <NavLink to={'/DSS'}>
          <div className={'mainMenuButton'}>
            <h2>DSS</h2>
          </div>
        </NavLink>
      </div>
      <div className={'display'}>
        <Switch>
          <Route path={'/usuarios'}><UsuariosView/></Route>
          <Route path={'/apuestas'}><ApuestasView/></Route>
          <Route path={'/eventos'}><EventosView/></Route>
          <Route path={'/mercados'}><MercadosView/></Route>
          <Route path={'/DSS'}><DSSView/></Route>
        </Switch>
      </div>
    </div>
  );
}

const openUsersMenu = () => {
  console.log("wiii");
}

export default App;
