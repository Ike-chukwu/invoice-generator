import * as yup from 'yup';

export const invoiceSchema = yup.object().shape({
    streetAddressOfBusinessOwner: yup.string().required('Street Address is required'),
    cityOfBusinessOwner: yup.string().required('City is required'),
    postCodeOfBusinessOwner: yup.string().required('Post Code is required'),
    countryOfBusinessOwner: yup.number().required('Country is required'),
    clientName: yup.string().required('Client Name is required'),
    clientEmail: yup.string().required('Client Email is required'),
    streetAddressOfClient: yup.string().required('Street Address is required'),
    cityOfClient: yup.string().required('City is required'),
    postCodeOfOfClient: yup.string().required('Post Code is required'),
    countryOfClient: yup.number().required('Country is required'),
    invoiceDate: yup.string().required('Date is required'),
    paymentTerms: yup.number().required('Payment term is required'),
    projectDescription: yup.string().required('Project Description is required'),
    itemsList: yup.array().of(yup.object().shape({
        itemName: yup.string().required('Project Description is required'),
        itemQuantity: yup.number() // Validates for numerical value
            .positive("Must be a positive value"), // Validates against negative values
        // .required("Please enter a number. The field cannot be left blank.") // Sets it as a compulsory field
        // .min(1, "Hey! Your number must be greater than or equal to 1!"), // Sets a minimum value});
        itemPrice: yup.number() // Validates for numerical value
        // .positive("Must be a positive value") // Validates against negative values
        // .required("Please enter the price. The field cannot be left blank."), // Sets it as a compulsory field
    }))

});


export type invoicePayload = yup.InferType<typeof invoiceSchema>


