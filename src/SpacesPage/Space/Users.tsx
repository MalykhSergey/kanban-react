import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../../Alert";
import { AppContext } from "../../App";
import UserDTO from "../../DTO/UserDTO";
import AddLogo from "../../logo/logo-add.png";
import DeleteLogo from "../../logo/logo-delete.png";
import UserLogo from "../../logo/logo-user.png";
import "./users.css";

export default function Users() {
    let [users, setUsers] = useState(new Array<UserDTO>)
    let pathParams = useParams()
    let authManager = useContext(AppContext).authManager
    let [alert, setAlert] = useState({ show: false, message: "", class: "" })
    async function loadUsers() {
        const response = await authManager.sendAuthRequest(`/spaces/${pathParams.id}/users`, "GET", "")
        setUsers(await response.json())
    }
    async function addUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await authManager.sendAuthRequest(
            `/spaces/${pathParams.id}/users?userName=${(document.getElementById("input-user-name") as HTMLInputElement)!.value}`, "POST", "")
        if (response.status == 200) {
            loadUsers()
        } setAlert({ show: true, message: await response.text(), class: "" })
    }
    async function deleteUser(userId: number) {
        const response = await authManager.sendAuthRequest(
            `/spaces/${pathParams.id}/users?userId=${userId}`, "DELETE", "")
        if (response.status == 200) {
            loadUsers()
        } else
            setAlert({ show: true, message: await response.text(), class: "" })
    }
    useEffect(() => {
        loadUsers()
    }, [pathParams])
    const usersElements = users.map(user => {
        if (authManager.getUserName() != user.name) {
            return (
                <div key={user.id} className="user">
                    <img src={UserLogo} width="40px" />
                    {user.name}
                    <input type="image" width="30px" src={DeleteLogo} onClick={() => deleteUser(user.id)}></input>
                </div>)
        }
    })
    return (
        <div>
            <h2>Users in space:</h2>
            <div className="users-list">
                {usersElements}
            </div>
            {alert.show &&
                <Alert message={alert.message} class={alert.class}></Alert>}
            <form className="row-input" onSubmit={addUser}>
                <input placeholder="User name" type="text" id="input-user-name" style={{border:"none",borderBottom:"1px solid black"}}/>
                <input type="image" width="30px" src={AddLogo}></input>
            </form>
        </div>)
}