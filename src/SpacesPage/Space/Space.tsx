import { ReactElement, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../App"
import TaskDTO from "../../DTO/TaskDTO"
import AddLogo from "../../logo/logo-add.png"
import CreateLogo from "../../logo/logo-create.png"
import Task from "./Task"
import Users from "./Users"
import "./space.css"

export default function Space() {
    let pathParams = useParams()
    let [tasks, setTasks] = useState(new Array<TaskDTO>)
    let createdTasks = new Array<ReactElement>
    let plannedTasks = new Array<ReactElement>
    let doneTasks = new Array<ReactElement>
    let [isShowed, setIsShowed] = useState(false)
    const authManager = useContext(AppContext).authManager
    async function loadTasks() {
        const response = await authManager.sendAuthRequest(`/tasks?spaceId=${pathParams.id}`, "GET", "")
        if (response.status != 200){
            alert("There's been some error!")
        }
        setTasks(await response.json())
    }
    async function createTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const response = await authManager.sendAuthRequest("/tasks", "POST", JSON.stringify({
            spaceId: pathParams.id,
            name: (document.getElementById("taskName") as HTMLInputElement)!.value
        }))
        if (response.status == 200) {
            setIsShowed(!isShowed)
            loadTasks()
        } else alert(`There's been some error!${await response.text()}`)
    }
    tasks.forEach(task => {
        let taskCard = <Task key={task.id} taskDTO={task} reload={loadTasks}></Task>
        switch (task.status) {
            case "Created":
                createdTasks.push(taskCard)
                break;
            case "Planned":
                plannedTasks.push(taskCard)
                break;
            case "Done":
                doneTasks.push(taskCard)
                break;
        }
    })
    useEffect(() => {
        loadTasks()
    }, [pathParams])
    return (
        <div>
            <h2>Created Tasks <input type="image" src={CreateLogo} width="30px" onClick={() => setIsShowed(!isShowed)} /></h2>
            {isShowed &&
                <form className="row-input" onSubmit={createTask}>
                    <label htmlFor="taskName">Enter task name:</label>
                    <input type="text" id="taskName" />
                    <input type="image" src={AddLogo} width="30px"></input>
                </form>}
            <div className="tasks-list">
                {createdTasks}
            </div>
            <h2>Planned Tasks</h2>
            <div className="tasks-list">
                {plannedTasks}
            </div>
            <h2>Done Tasks</h2>
            <div className="tasks-list">
                {doneTasks}
            </div>
            <Users></Users>
        </div>
    )
}