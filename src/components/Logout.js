import { useHistory } from "react-router-dom";
export function Logout({logout,token}){
    let history=useHistory();
    logout(token);
    history.push('/')

}