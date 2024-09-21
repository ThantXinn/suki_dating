/** @format */

import { personType } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const YourType = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
  };
  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full z-10'>
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
      <div className='flex flex-wrap items-center justify-start gap-2 py-5 px-36'>
        {personType.map(({ id, title }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              disabled={
                !selectedItem.includes(title) && selectedItem.length >= 9
              }
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
