/** @format */

import { livingWithWho } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const LivingWithWho = ({
  selectedItem,
  setSelectedItem,
  currentStepIndex,
}: {
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
  currentStepIndex: number;
}) => {
  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (selectedItem.length <= 4 && currentStepIndex === 3) {
      const newItemsUpdate = [...selectedItem];
      if (selectedItem.length === 4) {
        newItemsUpdate[currentStepIndex + 1] = value;
        //if users selected only one value form previous component
        //                      (or)
        //selected values contain four excecute / check below condition
        const checkSelectedItem = livingWithWho.filter(
          (item) => item.title === selectedItem[currentStepIndex],
        );
        if (checkSelectedItem.length > 0) {
          const filterItems = newItemsUpdate.filter((item) => item !== value);
          filterItems[filterItems.length - 1] = value;
          setSelectedItem([...filterItems]);
        }
      }
      //console.log(selectedItem);
    } else if (selectedItem.length >= 5 && currentStepIndex === 3) {
      //if users click back/previous button with respective selected values
      //check the current page of previous user selected value and get the upate value when user select the item
      const updateUserClickedItem = value;
      //const finalUserSelectedItem_ = selectedItem[selectedItem.length - 1];
      const newItemsUpdate = [...selectedItem];

      //replace final user selected item to previous selected item
      newItemsUpdate[currentStepIndex + 1] = updateUserClickedItem;

      //after replaced final user selected item to previous selected item
      //console.log(newItemsUpdate, updateUserClickedItem);
      setSelectedItem([...newItemsUpdate]);
      //console.log(newItemsUpdate);
    }
  };
  //console.log("after fired click event value", selectedItem);

  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            Who are you living with now...?
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
