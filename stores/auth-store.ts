import { create } from "zustand"


type AuthStore = {
    authInfo: {
        accessToken: string
        refreshToken: string
        userId: string
    },
    setAuthInfo: (param: { accessToken?: string, refreshToken?: string, userId?: string }) => void
}


export const useAuthStore = create<AuthStore>((set) => ({
    authInfo: {
        accessToken: "",
        refreshToken: "",
        userId: "",
    },
    setAuthInfo: (param) => set((state) => {
        return {
            authInfo: {
                accessToken: param.accessToken ?? state.authInfo.accessToken,
                refreshToken: param.refreshToken ?? state.authInfo.refreshToken,
                userId: param.userId ?? state.authInfo.userId,
            }
        }
    })
}))


export const getAccessToken = () => useAuthStore.getState().authInfo.accessToken;
export const getRefreshToken = () => useAuthStore.getState().authInfo.refreshToken;
export const getUserId = () => useAuthStore.getState().authInfo.userId;
export const setAuthInfo = (authInfo: any) => useAuthStore.getState().setAuthInfo(authInfo);
