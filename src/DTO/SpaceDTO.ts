export default class SpaceDTO {
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
    constructor(id: number, name: string) {
        this._id = id
        this._name = name
    }
}