import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../Alert"
import { AppContext } from "../App"

export default function LoginPage() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let authManager = useContext(AppContext).authManager
    let [alert, setAlert] = useState({ show: false, message: "", class: "" })
    let navigate = useNavigate()
    async function sendLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (await authManager.login(username, password)) navigate("/spaces")
        else
            setAlert({ show: true, message: await "Invalid credentials!", class: "" })
    }
    return (
        <main id="registration-container">
            <h1>Login</h1>
            {alert.show &&
                <Alert message={alert.message} class={alert.class}></Alert>}
            <form onSubmit={sendLogin} className="login-form">
                <input type="text" id="username" placeholder="Nickname"
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                <input type="password" id="password" placeholder="Password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                <button type="submit">Sign in</button>
                <Link to="/registration">You can register here</Link>
            </form>
        </main>
    )
}