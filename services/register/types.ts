export type RegisterResponse = {
    message: string,
    invoiceListOfNewUser: Array<{
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
}