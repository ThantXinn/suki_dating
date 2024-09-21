/** @format */
"use client";
import { jobs } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const JobCategory = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}) => {
  const currentStepIndex = 1;
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
      newItemsUpdate[currentStepIndex - 1] = updateUserClickedItem;

      //after replaced final user selected item to previous selected item
      //console.log(newItemsUpdate, prevUserClickedItem, updateUserClickedItem);
      setSelectedItem([...newItemsUpdate]);
    } else {
      setSelectedItem([value]);
    }
  };
  //console.log(selectedItem);
  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What kind of work do you do...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='flex flex-wrap items-center justify-start gap-1 py-5 px-36'>
        {jobs.map(({ id, title, desc }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`p-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200"
                  : ""
              }`}
              onClick={() => handleOnClick(title)}>
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategory;
