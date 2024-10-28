import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    name: yup.string().required("Name is required")
})


export type RegisterPayload = yup.InferType<typeof registerSchema>