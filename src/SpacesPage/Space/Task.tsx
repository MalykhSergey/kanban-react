import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import TaskDTO from "../../DTO/TaskDTO";
import DeleteLogo from "../../logo/logo-delete.png";
import EditLogo from "../../logo/logo-edit.png";
import SaveLogo from "../../logo/logo-save.png";
import CancelLogo from "../../logo/logo-undo.png";
import "./taskStyle.css";

export default function Task(props: { taskDTO: TaskDTO, reload: () => {} }) {
    let [disableState, setDisableState] = useState(true)
    let pathParams = useParams()
    let [name, setName] = useState(props.taskDTO.name);
    let [description, setDescription] = useState(props.taskDTO.description);
    let [status, setStatus] = useState(props.taskDTO.status);
    const authManager = useContext(AppContext).authManager
    async function update() {
        props.taskDTO.name = name
        props.taskDTO.description = description
        props.taskDTO.status = status
        const response = await authManager.sendAuthRequest(`/tasks?id=${pathParams.id}`, "PUT", JSON.stringify(props.taskDTO))
        if (response.status == 200) {
            props.reload()
        } else alert(`There's been some error!${await response.text()}`)
        setDisableState(!disableState)
    }
    async function deleteTask() {
        const response = await authManager.sendAuthRequest("/tasks", "DELETE", JSON.stringify(props.taskDTO))
        if (response.status == 200) {
            props.reload()
        } else alert(`There's been some error!${await response.text()}`)
    }
    function cancelEditHandler() {
        if (!disableState) {
            setName(props.taskDTO.name)
            setDescription(props.taskDTO.description)
            setStatus(props.taskDTO.status)
        }
        setDisableState(!disableState)
    }
    let taskTitle
    let taskDescription
    let taskStatus
    if (disableState) {
        taskTitle = <div className="task-title">{name}<input type="image" src={disableState ? EditLogo : CancelLogo} width="30px" onClick={cancelEditHandler} className="edit-logo"></input></div>
        taskDescription = description
    } else {
        if (description == null) description = ""
        taskDescription = <textarea value={description} onChange={(event) => setDescription(event.target.value)} disabled={disableState} />
        taskTitle = <div className="task-title"><input type="text" value={name} onChange={(event) => setName(event.target.value)} disabled={disableState} /><input type="image" src={disableState ? EditLogo : CancelLogo} width="30px" onClick={cancelEditHandler} className="edit-logo"></input></div>
        taskStatus = <select value={status} onChange={(event) => setStatus(event.target.value)} disabled={disableState} >
            <option value="Created">Created</option>
            <option value="Planned">Planned</option>
            <option value="Done">Done</option>
        </select>
    }
    return (<div className="card task">
        {taskTitle}
        <div className="task-description">{taskDescription}</div>
        <div className="task-status">{taskStatus}</div>
        <div className="commands">
            {!disableState &&
                <input type="image" src={SaveLogo} width="30px" onClick={update}></input>
            }
            <input type="image" src={DeleteLogo} width="30px" onClick={deleteTask}></input>
        </div>
    </div>)
}