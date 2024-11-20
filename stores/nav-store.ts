import { create } from "zustand"


type NavStore = {
    isNavActive: boolean
    toggleNav: () => void
}



export const useNavStore = create<NavStore>((set) => ({
    isNavActive: false,
    toggleNav: () => set((state) => ({ isNavActive: !state.isNavActive })),
}));
