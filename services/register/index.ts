import { axiosInstance } from "@/constants"
import { RegisterPayload } from "./schema"
import { RegisterResponse } from "./types"

export class RegisterService {

    private static REGISTER_USER_URL = '/registerUser'


    public static async signup(payload: RegisterPayload) {
        // return fetch("http://localhost:3500/registerUser", {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        // });

       return axiosInstance.post<RegisterResponse>(this.REGISTER_USER_URL, payload)
    }


}