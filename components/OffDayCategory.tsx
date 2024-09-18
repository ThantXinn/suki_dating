/** @format */
"use client";

import { offDays } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const OffDayCategory = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}) => {
  //const [tempSelectedItem, setTempSelectedItem] = useState<string>("");
  //console.log(selectedItem);
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
  };
  //console.log(selectedItem);
  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What is your off days...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='flex flex-col items-start justify-center gap-y-3 w-fit py-16 px-36'>
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
