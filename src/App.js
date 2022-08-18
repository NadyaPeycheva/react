import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";

import { Logout } from "./components/Logout";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { Details } from "./components/Details";
import { CreatePet } from "./components/CreatePet";
import { EditPet } from "./components/EditPet";
import { AllPets } from "./components/AllPets";

function App() {
  let url = "http://localhost:3030";

  let [user, setUser] = useState("");
  let [token, setToken] = useState("");
  let [id, setId] = useState("");
  async function login(email, password) {
    let option = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    let res = await fetch(`${url}/users/login`, option);
    try {
      let result = await res.json();
      if (res.ok !== true) {
        throw new Error(result.message);
      } else {
        setUser(email);
        setToken(result.accessToken);
        setId(result._id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function logout(token) {
    let option = {
      headers: { "X-Authorization": token },
    };
    let res = await fetch(`${url}/users/logout`, option);

    try {
      if (res.status === 204) {
        setUser("");
        setToken("");
        setId("");
        return res;
      }
    } catch (e) {
      console.log("error", e.message);
    }
  }

  async function register(email, password) {
    let options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    let res = await fetch(`${url}/users/register`, options);

    try {
      let response = await res.json;
      if (res.ok !== true) {
        throw new Error(response.message);
      }else{
        return response;
      }
    } catch (e) {}
  }

  return (
    <div className="App">
      <header className="site-header">
        <Navigation user={user} />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Dashboard url={url}/>
            </Route> 
          <Route path="/login" >
            <Login login={login} />
          </Route>
          <Route path="/logout" >
            <Logout logout={logout} token={token} />
          </Route>
          <Route path="/register"  >
            <Register register={register}/>
            </Route>
            {/* <Route path="/details/:petId" component={Details } /> */}
            <Route path="/details/:petId" exact >
              <Details id={id} token={token} />
              </Route>
              <Route path="/details/edit/:petId" >
                <EditPet token={token}/>
                </Route>
              
              <Route path="/add" >
                <CreatePet token={token}/>
              </Route>
              <Route path="/allPets" >
                <AllPets userId={id}/>
                </Route>
            
        </Switch>
      </main>
      <footer id="site-footer">
            <p>@PetMyPet</p>
        </footer>
    </div>
  );
}

export default App;
