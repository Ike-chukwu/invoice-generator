import { useMutation } from '@tanstack/react-query';
import { RegisterService } from './../services/register/index';
import { RegisterPayload } from './../services/register/schema';
import { RegisterResponse } from "@/services/register/types"
import { useAuthStore } from '@/app/store';
import { AxiosError } from 'axios';



export const useRegister = ({ onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }) => {

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: async (variables: RegisterPayload) => {
            return RegisterService.signup(variables);
        },
        mutationKey: ["signup"],
        onSuccess: (data) => {
            if (typeof data === "object") {
                console.log(data);
                onSuccess?.();
            }
        },
        onError: () => {
            onError?.()
            // console.log('error occured')
        }

    })
    return {
        signup: mutate,
        isLoading: isPending,
        isError,
        isSuccess
    }
}


