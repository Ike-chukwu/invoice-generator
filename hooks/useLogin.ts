import { setAuthInfo } from "@/stores/auth-store";
import { LoginService } from "@/services/login";
import { LoginPayload } from "@/services/login/schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogin = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {

    const { push } = useRouter()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: async (variables: LoginPayload) => {
            return LoginService.login(variables);
        },
        mutationKey: ["login"],
        onSuccess: (data) => {
            if (typeof data === "object") {
                console.log(data.data);
                setAuthInfo({
                    accessToken: data.data.accessToken,
                    refreshToken: data.data.refreshToken,
                    userId: data.data.userId,
                })
                onSuccess?.();
                push("/")
            }
        },
        onError: () => {
            onError?.()
            console.log('error occured')
        }

    })
    return {
        login: mutate,
        isLoading: isPending,
        isError,
        isSuccess
    }
}
