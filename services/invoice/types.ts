export type InvoiceResponse = {
    code: string,
    streetAddressOfBusinessOwner: string,
    cityOfBusinessOwner: string,
    postCodeOfBusinessOwner: string,
    countryOfBusinessOwner: string,
    clientName: string,
    clientEmail: string,
    streetAddressOfClient: string,
    cityOfClient: string,
    postCodeOfOfClient: string,
    countryOfClient: string,
    dueDate: string,
    invoiceDate: string,
    paymentTerms: string,
    projectDescription: string,
    itemsList: Item[],
    status: string,
    _id: string
}


export type Item = {
    itemName: string,
    itemQuantity: number,
    itemPrice: number,
    total?: number,
    _id: string
}