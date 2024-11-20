import React from "react";
import { DeleteIcon } from "./icons";
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";

type Props = {
  removeItem: UseFieldArrayRemove;
  index: number;
  register: UseFormRegister<any>;
  listOfItems:
    | Array<{
        itemName: string;
        itemQuantity: number;
        itemPrice: number;
      }>
    | any;
  watch: (fieldName: string) => void;
};

const ItemDetail = ({
  removeItem,
  register,
  index,
  watch,
  listOfItems,
}: Props) => {
  const watchedQuantity = watch(`itemsList.${index}.itemQuantity`);
  const watchedPrice = watch(`itemsList.${index}.itemPrice`);

  return (
    <div className="flex w-full gap-2 justify-between ">
      <div className="w-[95%] flex gap-3">
        <div className="flex flex-col gap-5 w-[60%]">
          <label
            htmlFor=""
            className="text-[11px] font-bold capitalize text-[#8A91C5] "
          >
            item name
          </label>
          <input
            type="text"
            {...register(`itemsList.${index}.itemName`)}
            // name={`itemsList.${index}.itemName`}
            className="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
          />
        </div>
        <div className="flex flex-col gap-5 w-[20%]">
          <label
            htmlFor=""
            className="text-[11px] font-bold capitalize text-[#8A91C5] "
          >
            quantity
          </label>
          <input
            {...register(`itemsList.${index}.itemQuantity`)}
            type="number"
            className="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
          />
        </div>
        <div className="flex flex-col gap-5 w-[20%]">
          <label
            htmlFor=""
            className="text-[11px] font-bold capitalize text-[#8A91C5] "
          >
            price
          </label>
          <input
            {...register(`itemsList.${index}.itemPrice`)}
            // name={`itemsList.${index}.itemPrice`}
            type="number"
            className="px-4 py-4 border-[0.1px] text-[10px] border-[#DFE3FA] w-full"
          />
        </div>
        <div className="flex flex-col gap-8 w-[20%]">
          <label
            htmlFor=""
            className="text-[11px] font-bold capitalize text-[#8A91C5] "
          >
            total
          </label>
          <p className="text-[12px]">
            {" "}
            {(watchedPrice ?? 0 )* (watchedQuantity ?? 0)}
          </p>
        </div>
      </div>
      <div className="w-[5%] flex items-center justify-end">
        <div className="mt-6">
          <DeleteIcon
            className="cursor-pointer"
            onClick={() => removeItem(index)}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
