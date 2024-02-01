import { BASE_URL } from "./App"

export default class AuthManager {
    private _isAuth: boolean
    private _header: string
    private _userName: string
    constructor() {
        this._isAuth = false
        this._header = ""
        this._userName = ""
        const storedAuth = localStorage.getItem("auth")
        if (storedAuth != null) {
            let auth = JSON.parse(storedAuth)
            this._isAuth = auth.isAuth
            this._header = auth.header
            this._userName = auth.userName
        } else {
            let auth = {
                isAuth: this._isAuth,
                header: this._header,
                userName: this._userName
            }
            localStorage.setItem("auth", JSON.stringify(auth))
        }
    }
    private createAuthHeader(userName: string, password: string): string {
        return 'Basic ' + btoa(`${userName}:${password}`)
    }
    async login(userName: string, password: string): Promise<boolean> {
        const authHeader = this.createAuthHeader(userName, password)
        const response = await fetch(`${BASE_URL}/users`, {
            method: "GET",
            headers: { "Authorization": authHeader }
        })
        const message = await response.text()
        if (response.status == 200) {
            const auth = { isAuth: true, header: authHeader, userName:userName }
            this._header = authHeader
            this._isAuth = true
            this._userName=userName
            localStorage.setItem("auth", JSON.stringify(auth))
            return true
        } else return false
    }
    async register(userName: string, password: string): Promise<string> {
        let response = await fetch(`${BASE_URL}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: userName, password: password })
            })
        if (response.status == 200) {
            this._header = this.createAuthHeader(userName, password)
            this._isAuth = true
            this._userName = userName
            const auth = { isAuth: true, header: this._header, userName: this._userName }
            localStorage.setItem("auth", JSON.stringify(auth))
            return "Registered"
        }
        return response.text()
    }
    sendAuthRequest(uri: string, method: string, body: string) {
        let options: any = {
            method: method,
            headers: {
                "Authorization": this._header,
                "Content-Type": "application/json",
            },
        }
        if (body != "") {
            options.body = body
        }
        return fetch(`${BASE_URL}${uri}`, options)
    }
    public logout() {
        this._isAuth = false
        this._header = ""
        this._userName = ""
        const auth = { isAuth: false, header: this._header, userName:this._userName}
        localStorage.setItem("auth", JSON.stringify(auth))   
    }
    public isAuthenticated(): boolean {
        return this._isAuth
    }
    public getUserName():string{
        return this._userName
    }
}