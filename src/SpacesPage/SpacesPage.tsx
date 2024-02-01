import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import SpaceDTO from "../DTO/SpaceDTO";
import LogoOut from "../logo/logo-logout.png";
import LogoSpaces from "../logo/logo-spaces.png";
import AddLogo from "../logo/logo-add.png";
import DeleteLogo from "../logo/logo-delete.png";
import LeftArrowLogo from "../logo/logo-left-arrow.png";
import "./style.css";

export default function SpacesPage() {
    const authManager = useContext(AppContext).authManager
    let [spaces, setSpaces] = useState(new Array<SpaceDTO>);
    let [barStatus, setBarStatus] = useState("showed");
    async function loadSpaces() {
        const response = await authManager.sendAuthRequest("/spaces", "GET", "")
        setSpaces(await response.json())
    }
    async function createSpace(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let spaceNameInput = document.getElementById("spaceName")! as HTMLInputElement
        const response = await authManager.sendAuthRequest("/spaces", "POST", JSON.stringify({ "name": spaceNameInput.value }))
        if (response.status == 200) {
            loadSpaces()
        }
        else alert("There's been some error!")
    }
    async function deleteSpace(spaceId: number) {
        const response = await authManager.sendAuthRequest(`/spaces?spaceId=${spaceId}`, "DELETE", "")
        if (response.status == 200) {
            loadSpaces()
        }
    }
    const spacesCards = spaces.map(space => {
        return (
            <div className="space card row-input" key={space.id}>
                <Link to={`/spaces/${space.id}`}>
                    {space.name}
                </Link>
                <input type="image" width="30px" src={DeleteLogo} onClick={() => deleteSpace(space.id)} />
            </div>
        )
    })
    useEffect(() => {
        loadSpaces()
    }, [])
    return (
        <main id="main-screen">
            <div id="space-bar" className={barStatus}>
                <div className="hidden-part">
                    <div className="row-input"><img src={LogoSpaces} width="30px" /><h3>Spaces:</h3></div>
                    <div className="spaces">
                    {spacesCards}
                    </div>
                    <label htmlFor="spaceName">New space name:</label>
                    <form id="spaceForm" className="col-input" onSubmit={createSpace}>
                        <input type="text" id="spaceName" />
                        <input type="image" src={AddLogo} width="30px"></input>
                    </form>
                    <Link className="row-input" to="/logout"><img src={LogoOut} width="30px"/>Logout</Link>
                </div>
                <input type="image" src={LeftArrowLogo} width="30px" id="hideButton" onClick={() => {
                    if (barStatus == "showed")
                        setBarStatus("hidden")
                    else
                        setBarStatus("showed")
                }}></input>
            </div>
            <Outlet ></Outlet>
        </main>
    )
}