import { create } from "zustand"

export type Invoice = {
    id: string
    code: string
    itemsList?: {
        itemQuantity?: number | undefined;
        itemPrice?: number | undefined;
        itemName: string;
        total: number
    }[] | undefined;
    streetAddressOfBusinessOwner: string;
    cityOfBusinessOwner: string;
    postCodeOfBusinessOwner: string;
    countryOfBusinessOwner: string;
    clientName: string;
    clientEmail: string;
    streetAddressOfClient: string;
    cityOfClient: string;
    postCodeOfOfClient: string;
    countryOfClient: string;
    invoiceDate: string;
    paymentTerms: string;
    projectDescription: string;
    dueDate: string;
    status: string
}

type invoiceStore = {
    listOfInvoices: Array<Invoice>
    addInvoice: (newInvoice: any) => void
    editInvoice: (invoice: any) => void
    changeInvoiceStatus: (id: string) => void
    deleteInvoice: (id: string) => void
}

type NavStore = {
    isNavActive: boolean
    toggleNav: () => void
}


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
export const setAuthInfo = (authInfo: any) => useAuthStore.getState().setAuthInfo(authInfo);


export const useNavStore = create<NavStore>((set) => ({
    isNavActive: false,
    toggleNav: () => set((state) => ({ isNavActive: !state.isNavActive })),
}));


export const useInvoiceStore = create<invoiceStore>((set) => ({
    listOfInvoices: [],
    addInvoice: (newInvoice) => {
        set((state) => ({ listOfInvoices: [...state.listOfInvoices, newInvoice] }))
    },

    editInvoice: (editedInvoice: Invoice) => {
        set((state) => {

            const listOfInvoicesCopy = [...state.listOfInvoices]
            const indexOfEditedInvoice = listOfInvoicesCopy.findIndex((invoice) => invoice.id == editedInvoice.id)
            listOfInvoicesCopy[indexOfEditedInvoice] = editedInvoice
            return {
                listOfInvoices: listOfInvoicesCopy
            }
        })
    },


    changeInvoiceStatus: (id: string) => {
        set((state) => {

            const listOfInvoiceCopy = [...state.listOfInvoices]
            const foundInvoice = listOfInvoiceCopy.find((invoice) => invoice.id == id)
            const foundInvoiceIndex = listOfInvoiceCopy.findIndex((invoice) => invoice.id == id)
            const foundInvoiceCopy = { ...foundInvoice }
            if (foundInvoiceIndex !== -1) {
                const foundInvoiceCopy = { ...listOfInvoiceCopy[foundInvoiceIndex] };

                foundInvoiceCopy.status = "paid";

                listOfInvoiceCopy[foundInvoiceIndex] = foundInvoiceCopy;
            }

            return {
                listOfInvoices: listOfInvoiceCopy
            }
        })
    },

    deleteInvoice: (id: string) => {
        set((state) => {
            const filteredListOfInvoices = state.listOfInvoices.filter((invoice) => invoice.id !== id)
            return {
                listOfInvoices: filteredListOfInvoices
            }
        })
    }
}))