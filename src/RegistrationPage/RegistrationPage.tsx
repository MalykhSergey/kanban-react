import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../Alert"
import { AppContext } from "../App"

export default function RegistrationPage() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [alert, setAlert] = useState({ show: false, message: "", class: "" })
    let authManager = useContext(AppContext).authManager
    let navigate = useNavigate();
    async function register(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const registerResult = authManager.register(username, password)
        if (await registerResult == "Registered")
            navigate("/spaces")
        else
            setAlert({ show: true, message: await registerResult, class: "" })
    }
    return (
        <main id="registration-container">
            <h1>Registration</h1>
            {alert.show &&
                <Alert message={alert.message} class={alert.class}></Alert>}
            <form onSubmit={register} className="login-form">
                <input type="text" id="username" placeholder="Nickname"
                    onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                <input type="password" id="password" placeholder="Password"
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                <button type="submit">Submit</button>
                <Link to="/login">Yet have account? Login here!</Link>
            </form>
        </main>
    )
}