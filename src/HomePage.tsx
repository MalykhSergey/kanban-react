import { Link } from "react-router-dom";
import LoginLogo from "./logo/logo-login.png"
import LogOutLogo from "./logo/logo-logout.png"
import SpacesLogo from "./logo/logo-spaces.png"

export default function HomePage() {
    return (
        <main style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding:"10px"
        }}>
            <h1>Demo project</h1>
            <p>
                Frontend for Kanban-board multi-user system  based on React, React-router.
            </p>
            <div>
                <h3>You can:</h3>
                <ul>
                    <li>Create/Remove Spaces</li>
                    <li>Create/Remove other users into spaces</li>
                    <li>Create/Edit/Remove tasks for spaces</li>
                </ul>
            </div>
            <Link to="/login"><img src={LoginLogo} width="30xp"/> Click here to Sign in</Link>
            <Link to="/registration"><img src={LogOutLogo} width="30xp"/>Click here to Sign up</Link>
            <Link to="/spaces"><img src={SpacesLogo} width="30xp"/>Click here to see spaces</Link>
        </main>
    )
}