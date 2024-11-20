import { InvoiceService } from "@/services/invoice"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateInvoice = ({ onSuccess, onError }: { onSuccess: () => void; onError: () => void }) => {
    const queryClient = useQueryClient()
    const { mutate, isError, isSuccess, isPending } = useMutation({
        mutationFn: async (variables: any) => { return InvoiceService.createInvoice(variables) },
        mutationKey: ["createInvoice"],
        onSuccess: (data) => {
            onSuccess?.()
            queryClient.invalidateQueries({ queryKey: ["fetchListOfInvoices"] })
        },
        onError: (error) => {
            console.log(error);

            onError?.()
        }
    })

    return {
        createInvoice: mutate,
        isError,
        isSuccess,
        isPending
    }

}


export const useEditInvoice = ({ onSuccess, onError, id }: { onSuccess: () => void; onError: () => void, id: string }) => {
    const queryClient = useQueryClient()
    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: (variables: any) => InvoiceService.editInvoice(variables),
        mutationKey: ["editInvoice"],
        onSuccess: () => {
            onSuccess?.()
            queryClient.invalidateQueries({ queryKey: ["fetchListOfInvoices"] })
            queryClient.refetchQueries({ queryKey: ["fetchListOfInvoices"] });
            queryClient.invalidateQueries({ queryKey: ["getInvoiceById", id] })
        },
        onError: (error) => {
            console.log(error);
            onError?.()
        }
    })

    return { editInvoice: mutate, isError, isPending, isSuccess }

}


export const useGetListOfInvoices = () => {
    const { data, isError, isSuccess, isPending } = useQuery({
        queryFn: () => {
            return InvoiceService.fetchListOfInvoices()
        },
        queryKey: ["fetchListOfInvoices",],
    })
    return {
        invoices: data?.data?.data,
        isError,
        isSuccess,
        isPending
    }


}


export const useGetInvoiceById = (id: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => {
            return InvoiceService.fetchInvoiceFromListOfInvoices(id)
        },
        queryKey: ["getInvoiceById", id],
        enabled: !!id
    })

    return {
        invoice: data?.data.data,
        isLoading,
        isError,
        isSuccess
    }
}