import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required")
})


export type LoginPayload = yup.InferType<typeof loginSchema>