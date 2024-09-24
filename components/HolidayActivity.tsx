/** @format */
/** there is a bugs and errors */
"use client";
import { holidayActivity } from "@/app/constants";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
const HolidayActivity = ({
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
    const holidayActivityTitles = holidayActivity.map(({ title }) => title);
    isItemSelect = holidayActivityTitles.some((item) =>
      selectedItem.includes(item),
    );
    setIsItemSelect(isItemSelect);
  }, [selectedItem[currentStepIndex]]);

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (
      selectedItem.length >= 4 &&
      selectedItem.length <= 4 &&
      currentStepIndex === 2
    ) {
      const newItemsUpdate = [
        ...selectedItem.slice(0, currentStepIndex),
        ...selectedItem.slice(currentStepIndex + 1),
      ];
      //console.log(newItemsUpdate);
      //if users click back/previous button with respective selected values
      //check the current page of previous user selected value and get the upate value when user select the item
      const updateUserClickedItem = value;
      setSelectedItem([...newItemsUpdate, updateUserClickedItem]);
      if (isSelected) {
        setSelectedItem(selectedItem.filter((item) => item !== value));
      }
    }
    if (selectedItem.length >= 5) {
      const yourHolidayActivity = holidayActivity.map((item) => item.title);
      const checkSelectedItemInclude = yourHolidayActivity.filter((item) =>
        selectedItem.find((y) => y === item),
      );
      if (checkSelectedItemInclude.length !== -1) {
        const updateItemIndex = selectedItem.indexOf(
          checkSelectedItemInclude[checkSelectedItemInclude.length - 1],
        );
        const replaceItems: string[] = [value];
        const isAlreadyExist = selectedItem.map(
          (item) => item === replaceItems[0],
        );
        const copyItems = [...selectedItem];
        const updateCopyItems = copyItems.toSpliced(
          updateItemIndex + 1,
          0,
          ...replaceItems,
        );
        setSelectedItem(updateCopyItems);
        const removeInitialSelectedItem =
          updateCopyItems[checkSelectedItemInclude.length];
        if (checkSelectedItemInclude.length >= 2) {
          const test = updateCopyItems.filter(
            (item) => item !== removeInitialSelectedItem,
          );
          setSelectedItem(test);
        }
        //console.log(replaceItems[0], checkSelectedItemInclude[0]);
      }
    } else if (selectedItem.length === 4) {
      //console.log(selectedItem.length);
      const getItem = selectedItem[currentStepIndex + 1];
      //console.log(getItem);
      const updateItem = [...selectedItem];
      updateItem[currentStepIndex + 1] = value;
      const finalSelectedItems = [...updateItem, getItem];
      console.log(finalSelectedItems);
      setSelectedItem([...finalSelectedItems]);
    }
  };

  function acceptOnlyTwoItems() {
    const allHolidayActivityTitles = holidayActivity.map(({ title }) => title);
    const holidayActivityOnlyTwoTitles = allHolidayActivityTitles.filter(
      (item) => selectedItem.includes(item),
    );
    return holidayActivityOnlyTwoTitles.length === 2 ? true : false;
  }
  return (
    <div className='flex flex-col items-center'>
      <div className='absolute top-5 bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            What do you do on your days off...?
            <span className='text-xs font-light mt-2'>
              You can select only two activities...!
            </span>
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='relative mt-24 mb-4 bg-slate-50 flex flex-wrap items-center justify-start gap-1 py-5 px-28'>
        {holidayActivity.map(({ id, title, icon }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              disabled={!selectedItem.includes(title) && acceptOnlyTwoItems()}
              onClick={() => {
                handleOnClick(title);
              }}>
              <Image
                src={icon}
                alt={title}
                className='w-5 h-5 object-cover'
              />
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayActivity;
