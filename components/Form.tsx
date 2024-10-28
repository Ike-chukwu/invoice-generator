import { invoicePayload, invoiceSchema } from "@/types/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import InputField from "./UI/Input";
import SelectField from "./UI/Select";
import ItemDetail from "./ItemDetail";
import { listOfCountries, paymentMethods } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import { Invoice, useInvoiceStore, useNavStore } from "@/app/store";
import { addDays, generateCode } from "@/helper";

type FormProps = {
  // isNavActive?: boolean;
  // toggleNav?: Dispatch<SetStateAction<boolean>>;
  // listOfFormData?: Array<{
  //   id: string;
  //   code: string;
  //   itemsList?:
  //     | {
  //         itemQuantity?: number | undefined;
  //         itemPrice?: number | undefined;
  //         itemName: string;
  //         total: number;
  //       }[]
  //     | undefined;
  //   streetAddressOfBusinessOwner: string;
  //   cityOfBusinessOwner: string;
  //   postCodeOfBusinessOwner: string;
  //   countryOfBusinessOwner: string;
  //   clientName: string;
  //   clientEmail: string;
  //   streetAddressOfClient: string;
  //   cityOfClient: string;
  //   postCodeOfOfClient: string;
  //   countryOfClient: string;
  //   invoiceDate: string;
  //   paymentTerms: string;
  //   projectDescription: string;
  //   dueDate: string;
  //   status: string;
  // }>;
  // setListOfFormData?: Dispatch<
  //   SetStateAction<
  //     {
  //       id: string;
  //       code: string;
  //       itemsList?:
  //         | {
  //             itemQuantity?: number | undefined;
  //             itemPrice?: number | undefined;
  //             itemName: string;
  //             total: number;
  //           }[]
  //         | undefined;
  //       streetAddressOfBusinessOwner: string;
  //       cityOfBusinessOwner: string;
  //       postCodeOfBusinessOwner: string;
  //       countryOfBusinessOwner: string;
  //       clientName: string;
  //       clientEmail: string;
  //       streetAddressOfClient: string;
  //       cityOfClient: string;
  //       postCodeOfOfClient: string;
  //       countryOfClient: string;
  //       invoiceDate: string;
  //       paymentTerms: string;
  //       projectDescription: string;
  //       dueDate: string;
  //       status: string;
  //     }[]
  //   >
  // >;
  invoice?: any;
  submitFormHandler: (invoice: invoicePayload) => void;
};

const Form = ({
  // isNavActive,
  // toggleNav,
  // listOfFormData,
  // setListOfFormData,
  invoice,
  submitFormHandler,
}: FormProps) => {
  const methods = useForm({
    resolver: yupResolver(invoiceSchema),
    mode: "all",
    defaultValues: {
      cityOfBusinessOwner: "",
      cityOfClient: "",
      clientEmail: "",
      clientName: "",
      countryOfBusinessOwner: "",
      countryOfClient: "",
      invoiceDate: "",
      itemsList: [],
      paymentTerms: "",
      postCodeOfBusinessOwner: "",
      postCodeOfOfClient: "",
      projectDescription: "",
      streetAddressOfBusinessOwner: "",
      streetAddressOfClient: "",
    },
  });
  const listOfInvoicesFromStore = useInvoiceStore(
    (state) => state.listOfInvoices
  );
  const { control, register, watch, reset } = methods;
  const {
    fields: listOfItems,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "itemsList",
  });

  const addInvoiceHandlerFromStore = useInvoiceStore(
    (state) => state.addInvoice
  );

  const isNavActive = useNavStore((state) => state.isNavActive);
  const toggleNav = useNavStore((state) => state.toggleNav);

  const saveAsDraftHandler = (values: invoicePayload) => {
    const randomCode = generateCode();
    const formatedItemsList = values.itemsList?.map((item) => {
      return {
        ...item,
        total: (item.itemPrice ?? 0) * (item.itemQuantity ?? 0),
      };
    });
    let dueDate;
    const selectedPaymentTerm = values.paymentTerms;
    if (parseInt(selectedPaymentTerm) === 1) {
      dueDate = addDays(values.invoiceDate, 1);
    } else if (parseInt(selectedPaymentTerm) === 2) {
      dueDate = addDays(values.invoiceDate, 7);
    } else if (parseInt(selectedPaymentTerm) === 3) {
      dueDate = addDays(values.invoiceDate, 14);
    } else if (parseInt(selectedPaymentTerm) === 4) {
      dueDate = addDays(values.invoiceDate, 21);
    }
    if (dueDate) {
      const date = new Date(dueDate);

      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "2-digit",
      };
      dueDate = date.toLocaleDateString("en-US", options);
    }

    addInvoiceHandlerFromStore({
      id: uuidv4(),
      code: randomCode,
      ...values,
      dueDate,
      itemsList: formatedItemsList,
      status: "draft",
    });
    toggleNav();
    reset();

    // setListOfFormData([
    //   ...listOfFormData,

    //   {
    //     id: uuidv4(),
    //     code: randomCode,
    //     ...values,
    //     dueDate,
    //     itemsList: formatedItemsList,
    //     status: "Draft",
    //   },
    // ]);

    // reset();
  };

  useEffect(() => {
    if (invoice) {
      methods.reset({
        ...invoice,
      });
    }
  }, [invoice]);

  const formSubmitHandler = (values: invoicePayload) => {
    submitFormHandler(values);
    if (!invoice) {
      reset();
    }
    toggleNav();
  };

  return (
    <div
      className={
        `fixed transition-all ease-in-out z-20  duration-500 e-in-out pl-[1.5rem] pr-[0.5rem] flex flex-col gap-8 md:gap-12 items-start w-full md:w-[720px] top-0 bottom-0 bg-[#FFFFFF] pt-[6rem] md:pt-[7.5rem] lg:pt-14 pb-6 md:pl-[3.3rem] lg:pl-[8.5rem] md:pr-[2rem] rounded-tr-[1.3rem] md:rounded-br-[1.3rem] ` +
        (isNavActive ? "left-0" : "left-[-100%]")
      }
    >
      <h1 className="text-[22px] font-bold capitalize">new invoice</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(formSubmitHandler)}
          className="h-full w-full flex flex-col  gap-[3rem] overflow-y-auto pr-[1rem]  md:pr-[2rem]"
        >
          <div className="flex flex-col gap-[1.6rem] w-full items-start">
            <p className="text-[11px] text-[#7C5DFA] font-bold capitalize ">
              bill from
            </p>
            <div className=" flex flex-col w-full ">
              <InputField
                name="streetAddressOfBusinessOwner"
                label="street address"
                labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                error={
                  methods.formState.errors.streetAddressOfBusinessOwner?.message
                }
                type="text"
                inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] "
              />
            </div>

            <div className="flex w-full gap-2 justify-between ">
              <div className="flex flex-col gap-2 w-[25%]">
                <InputField
                  label="city"
                  name="cityOfBusinessOwner"
                  error={methods.formState.errors.cityOfBusinessOwner?.message}
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                  type="text"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                />
              </div>
              <div className="flex flex-col gap-2 w-[25%]">
                <InputField
                  label="post code"
                  name="postCodeOfBusinessOwner"
                  error={
                    methods.formState.errors.postCodeOfBusinessOwner?.message
                  }
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <SelectField
                  error={
                    methods.formState.errors.countryOfBusinessOwner?.message
                  }
                  options={listOfCountries}
                  name="countryOfBusinessOwner"
                  label="country"
                  labelClassName="text-[11px]  font-bold capitalize text-[#8A91C5]"
                  selectClassName="px-4 text-[10px] outline-none py-4 border-[0.1px] border-[#DFE3FA] w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full items-start">
            <p className="text-[11px] text-[#7C5DFA] font-bold capitalize ">
              bill To
            </p>

            <div className=" flex flex-col w-full ">
              <InputField
                label="client's name"
                name="clientName"
                error={methods.formState.errors.clientName?.message}
                inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA] "
                labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                type="text"
              />
            </div>
            <div className=" flex flex-col w-full ">
              <InputField
                label=" client's email"
                name="clientEmail"
                error={methods.formState.errors.clientEmail?.message}
                labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                type="email"
                inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
              />
            </div>
            <div className=" flex flex-col w-full ">
              <InputField
                label="street address"
                name="streetAddressOfClient"
                error={methods.formState.errors.streetAddressOfClient?.message}
                type="text"
                labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
              />
            </div>

            <div className="flex w-full gap-2 justify-between ">
              <div className="flex flex-col gap-2 w-[25%]">
                <InputField
                  label="city"
                  name="cityOfClient"
                  error={methods.formState.errors.cityOfClient?.message}
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-[25%]">
                <InputField
                  label="post code"
                  name="postCodeOfOfClient"
                  error={methods.formState.errors.postCodeOfOfClient?.message}
                  inputClassName="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <SelectField
                  error={methods.formState.errors.countryOfClient?.message}
                  options={listOfCountries}
                  name="countryOfClient"
                  label="country"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  selectClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                />
              </div>
            </div>

            <div className="flex w-full gap-2 justify-between ">
              <div className="flex flex-col gap-2 w-[48%]">
                <InputField
                  label="Invoice Date"
                  name="invoiceDate"
                  error={methods.formState.errors.invoiceDate?.message}
                  inputClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                  type="date"
                />
              </div>
              <div className="flex flex-col gap-2 w-[48%]">
                <SelectField
                  error={methods.formState.errors.paymentTerms?.message}
                  label="payment terms"
                  name="paymentTerms"
                  options={paymentMethods}
                  selectClassName="px-4 text-[10px] py-4 border-[0.1px] border-[#DFE3FA] w-full"
                  labelClassName="text-[11px] font-bold capitalize text-[#8A91C5]"
                />
              </div>
            </div>

            <div className=" flex flex-col w-full ">
              <InputField
                label="project description"
                name="projectDescription"
                error={methods.formState.errors.projectDescription?.message}
                inputClassName="px-4 py-4 border-[0.1px] text-[10px]  border-[#DFE3FA]"
                labelClassName="text-[11px] font-bold capitalize text-[#8A91C5] mb-2"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[1.6rem] w-full items-start">
            <p className="text-lg text-[#8A91C5] font-bold capitalize ">
              Item List
            </p>
            <div className=" flex flex-col items-start w-full gap-6">
              {listOfItems.map((item, index) => (
                <ItemDetail
                  key={item.id}
                  index={index}
                  removeItem={removeItem}
                  listOfItems={listOfItems}
                  register={register}
                  watch={watch}
                />
              ))}
              <button
                onClick={() => {
                  appendItem({
                    itemName: "",
                    itemPrice: 0,
                    itemQuantity: 0,
                  });
                }}
                className="w-full py-3 font-bold rounded-3xl bg-[#f9fafe] text-[#7E88C3] text-[12px]"
              >
                + Add new item
              </button>
            </div>
          </div>
          <div
            className={`flex w-full items-center ${
              invoice ? "justify-end" : "justify-between"
            }`}
          >
            {!invoice && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleNav();
                }}
                className="text-[11px] self-start  p-4  capitalize rounded-3xl text-[#7E88C3] bg-[#f9fafe]"
              >
                discard
              </button>
            )}
            <div className="flex self-end gap-2">
              {!invoice && (
                <button
                  onClick={methods.handleSubmit(saveAsDraftHandler)}
                  type="submit"
                  className="text-[11px] p-4 capitalize rounded-3xl bg-[#0C0E16] font-bold text-white"
                >
                  save as draft
                </button>
              )}
              {invoice && (
                <button
                  // onClick={methods.handleSubmit(saveAsDraftHandler)}
                  type="submit"
                  className="text-[11px] p-4 capitalize rounded-3xl bg-[#f9fafe] font-bold text-[#7E88C3]"
                >
                  cancel
                </button>
              )}
              <button
                type="submit"
                className="text-[11px] capitalize  p-4 rounded-3xl font-bold bg-[#9277FF] text-white"
              >
                save and send
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
