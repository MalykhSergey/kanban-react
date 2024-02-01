import { useContext } from "react"
import { AppContext } from "./App"
import LogoLogin from "./logo/logo-login.png"
import { Link } from "react-router-dom"

export default function LogoutPage() {
    let authManager = useContext(AppContext).authManager
    authManager.logout()
    return (
        <main style={{
            padding:"10px"
        }}>
            <h1>You have successfully logged out!</h1>
            <Link className="row-input" to="/login"><img src={LogoLogin} width="30px"/>Sign in</Link>
        </main>
    )
}