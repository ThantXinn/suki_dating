/** @format */

import { livingWithWho } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const LivingWithWho = ({
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
    if (selectedItem.length == 5) {
      const shiftItem = [...selectedItem];
      const shiftedItem = shiftItem.shift();
      const afterRemovedItem = shiftItem.slice(0, shiftItem.length - 1);
      //console.log(removeItem, afterRemovedItem);
      //console.log(shiftedItem, "is shifted", shiftItem);
      if (shiftedItem) {
        //setSelectedItem(selectedItem.filter((item) => item !== shiftedItem));
        setSelectedItem([shiftedItem, ...afterRemovedItem, value]);
      } else {
        setSelectedItem([...selectedItem, value]);
      }
    }
  };
  //console.log(selectedItem);
  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            What do you do on your days off...?
            <span className='text-xs font-light mt-2'>
              Go to next step by choosing two!
            </span>
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='flex flex-wrap items-center justify-start gap-2 py-5 px-36'>
        {livingWithWho.map(({ id, title }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200 cursor-pointer"
                  : "cursor-not-allowed"
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

export default LivingWithWho;
