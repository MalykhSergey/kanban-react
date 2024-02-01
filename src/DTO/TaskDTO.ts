import UserDTO from "./UserDTO"

export default class TaskDTO {
    private _id: number
    public get id(): number {
        return this._id
    }
    public set id(value: number) {
        this._id = value
    }
    private _name: string
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    private _description: string
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    private _status: string
    public get status(): string {
        return this._status
    }
    public set status(value: string) {
        this._status = value
    }
    private _author: UserDTO
    public get author(): UserDTO {
        return this._author
    }
    public set author(value: UserDTO) {
        this._author = value
    }
    constructor(id: number, name: string, description: string, status: string,author:UserDTO) {
        this._id = id
        this._name = name
        this._description = description
        this._status = status
        this._author = author
    }
}