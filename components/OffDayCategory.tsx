/** @format */
"use client";

import { offDays } from "@/app/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const OffDayCategory = ({
  isItemSelect,
  setIsItemSelect,
  selectedItem,
  setSelectedItem,
  currentStepIndex,
}: {
  isItemSelect: boolean;
  setIsItemSelect: Dispatch<SetStateAction<boolean>>;
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
  currentStepIndex: number;
}) => {
  useEffect(() => {
    const OffDaysTitles = offDays.map(({ title }) => title);
    isItemSelect = OffDaysTitles.some((item) => selectedItem.includes(item));
    setIsItemSelect(isItemSelect);
  }, [selectedItem[currentStepIndex]]);

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (selectedItem.length == 2) {
      const shiftItem = [...selectedItem];
      const shiftedItem = shiftItem.shift();
      //console.log(shiftedItem, "is shifted", shiftItem);
      if (shiftedItem) {
        //setSelectedItem(selectedItem.filter((item) => item !== shiftedItem));
        setSelectedItem([shiftedItem, value]);
      } else {
        setSelectedItem([...selectedItem, value]);
      }
    }
    if (selectedItem.length > 2) {
      //if users click back/previous button with respective selected values
      //check the current page of previous user selected value and get the upate value when user select the item
      const updateUserClickedItem = value;
      //const finalUserSelectedItem_ = selectedItem[selectedItem.length - 1];
      const newItemsUpdate = [...selectedItem];

      //replace final user selected item to previous selected item
      newItemsUpdate[currentStepIndex] = updateUserClickedItem;

      //after replaced final user selected item to previous selected item
      //console.log(newItemsUpdate, prevUserClickedItem, updateUserClickedItem);
      setSelectedItem([...newItemsUpdate]);
    }
  };
  //console.log(selectedItem, selectedItem.length);
  return (
    <div className='flex flex-col items-center'>
      <div className='absolute top-5 bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What is your off days...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='relative top-14 flex flex-col items-start justify-center gap-y-3 w-fit py-16 px-36'>
        {offDays.map(({ id, title, desc }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`p-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200"
                  : ""
              }`}
              onClick={() => {
                handleOnClick(title);
              }}>
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffDayCategory;
