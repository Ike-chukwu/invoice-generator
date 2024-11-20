import { axiosInstance } from "@/constants"
import { LoginPayload } from "./schema"
import { LoginResponse } from "./types"



export class LoginService {

    private static LOGIN_URL = "/login"

    public static login(payload: LoginPayload) {
        return axiosInstance.post<LoginResponse>(this.LOGIN_URL, payload)
    }

}