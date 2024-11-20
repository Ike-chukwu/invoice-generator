export type ApiResponse<T> = {
    status: string
    statusText: string
    data: T
    error: string
}