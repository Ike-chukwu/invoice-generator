import { create } from "zustand"

type invoiceStore = {
    listOfInvoices: Array<{
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
    }>
    addInvoice: (newInvoice: any) => void
    removeInvoice: (id: any) => void
    editInvoice: (invoice: any) => void
    changeInvoiceStatus: (id: string) => void
}


export const useInvoiceStore = create<invoiceStore>((set) => ({
    listOfInvoices: [],
    addInvoice: (newInvoice) => {
        set((state) => ({ listOfInvoices: [...state.listOfInvoices, newInvoice] }))
    },
    removeInvoice: (id) => {
        set((state) => {
            const foundObject = state.listOfInvoices.find(id)
            const newListOfInvoices = state.listOfInvoices.filter((invoice) => invoice.id == id)
            return {
                listOfInvoices: newListOfInvoices
            }
        })
    },
    editInvoice: (editedInvoice: any) => {
        set((state) => {
            const filteredInvoice = state.listOfInvoices.filter((invoice) => invoice.id == editedInvoice.id)
            return {
                listOfInvoices: [...state.listOfInvoices, editedInvoice]
            }
        })
    },
    changeInvoiceStatus: (id: string) => {
        set((state) => {

            const listOfInvoiceCopy = [...state.listOfInvoices]
            const foundInvoice = listOfInvoiceCopy.find((invoice) => invoice.id == id)
            const foundInvoiceIndex = listOfInvoiceCopy.findIndex((invoice) => invoice.id == id)
            const foundInvoiceCopy = { ...foundInvoice }
            if (foundInvoiceCopy) {
                foundInvoiceCopy.status = "paid"
            }
            listOfInvoiceCopy[foundInvoiceIndex] = foundInvoiceCopy

            return {
                listOfInvoices: listOfInvoiceCopy
            }
        })
    }
}))