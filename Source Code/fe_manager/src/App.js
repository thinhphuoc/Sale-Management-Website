import './App.css';
import {
    Switch,
    Route
} from "react-router-dom";
import Home from "./components/Home";
import Store from "./components/Store";
import Transaction from "./components/Transaction";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="app">
            <NavBar/>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/store">
                    <Store/>
                </Route>
                <Route path="/transaction">
                    <Transaction/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
