/** @format */

"use client";
import { yourEductaion } from "@/app/constants";
import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type educationCategoryData = {
  educationCategory: string;
};
const YourEducation = ({
  icon,
  educationCategory,
  updateMultiFormData,
  isItemSelect,
  setIsItemSelect,
}: {
  icon: ReactElement;
  educationCategory: string;
  updateMultiFormData: (fields: Partial<educationCategoryData>) => void;
  isItemSelect: boolean;
  setIsItemSelect: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const educationTitles = yourEductaion.map(({ title }) => title);
    //if user selected item is exist return true;
    isItemSelect = educationTitles.includes(educationCategory);
    setIsItemSelect(isItemSelect);
  }, [educationCategory]);
  /*

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }

    if (selectedItem.length > 1) {
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
    } else {
      setSelectedItem([value]);
    }
  };

  */
  return (
    <div className='absolute flex flex-col items-center h-full w-full'>
      <div className='relative bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            Please tell us your highest education level...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='overflow-scroll bg-slate-50 h-full flex flex-wrap items-center justify-center gap-2 py-28 px-28'>
        {yourEductaion.map(({ id, title }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`p-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                educationCategory === title
                  ? "border-red-400 text-black-100 bg-slate-200"
                  : ""
              }`}
              onClick={() => updateMultiFormData({ educationCategory: title })}>
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourEducation;
