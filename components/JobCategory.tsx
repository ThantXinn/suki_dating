/** @format */
"use client";
import { jobs } from "@/app/constants";
import { Dispatch, ReactElement, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type jobCategoryData = {
  jobCategory: string;
};
const JobCategory = ({
  jobCategory,
  updateMultiFormData,
  icon,
  isItemSelect,
  setIsItemSelect,
}: {
  jobCategory: string;
  updateMultiFormData: (fields: Partial<jobCategoryData>) => void;
  icon: ReactElement;
  isItemSelect: boolean;
  setIsItemSelect: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const JobCategoryTitles = jobs.map(({ title }) => title);
    //if user selected item is exist return true;
    isItemSelect = JobCategoryTitles.includes(jobCategory);
    setIsItemSelect(isItemSelect);
  }, [jobCategory]);

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
  //console.log(jobCategory);
  return (
    <div className='absolute flex flex-col items-center h-full w-full'>
      <div className='relative bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What kind of work do you do...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='overflow-scroll bg-slate-50 flex flex-wrap items-center justify-start gap-2 py-3 px-28'>
        {jobs.map(({ id, title, desc }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`p-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                jobCategory === title
                  ? "border-red-400 text-black-100 bg-slate-200"
                  : ""
              }`}
              onClick={(e) => {
                //handleOnClick(title),
                updateMultiFormData({ jobCategory: title });
              }}>
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategory;
