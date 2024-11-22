import { ApiResponse } from './../generalType';
import { getUserId } from '@/stores/auth-store';
import { getAccessToken } from '@/stores/auth-store';
import { axiosInstance } from "@/constants"
import { InvoiceResponse } from './types';



export class InvoiceService {

    private static INVOICE_URL = `/invoice`

    public static createInvoice(payload: any) {

        return axiosInstance.post(this.INVOICE_URL, payload)
    }

    public static fetchListOfInvoices() {

        return axiosInstance.get<ApiResponse<InvoiceResponse[]>>(`${this.INVOICE_URL}`,)
    }

    public static fetchInvoiceFromListOfInvoices(id: string) {
        return axiosInstance.get<ApiResponse<InvoiceResponse>>(`${this.INVOICE_URL}s/${id}`)
    }


    public static editInvoice(editedInvoice: any) {
        return axiosInstance.patch(this.INVOICE_URL, { editedInvoice })
    }

    public static changeInvoiceStatus(editedInvoice: any) {
        return axiosInstance.patch(`/editInvoiceStatus`, { editedInvoice })
    }

    public static deleteInvoice(id: string) {
        return axiosInstance.delete(this.INVOICE_URL, { params: { id } })
    }
}