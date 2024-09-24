/** @format */

import { personType } from "@/app/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const YourType = ({
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
    const personTypeTitles = personType.map(({ title }) => title);
    isItemSelect = personTypeTitles.some((item) => selectedItem.includes(item));
    setIsItemSelect(isItemSelect);
  }, [selectedItem[currentStepIndex]]);

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
  };

  function acceptOnlyThreeItems() {
    const allPersonTypeTitles = personType.map(({ title }) => title);
    const personTypeOnlyThreeTitles = allPersonTypeTitles.filter((item) =>
      selectedItem.includes(item),
    );
    return personTypeOnlyThreeTitles.length === 3 ? true : false;
  }
  return (
    <div className='absolute flex flex-col items-center w-full h-full'>
      <div className='relative bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            What kind of person do people around you say you are...?
            <span className='text-xs font-light mt-2'>
              You can select up to three...!
            </span>
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='overflow-scroll flex flex-wrap items-center justify-start gap-2 py-5 px-28'>
        {personType.map(({ id, title }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              disabled={!selectedItem.includes(title) && acceptOnlyThreeItems()}
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

export default YourType;
