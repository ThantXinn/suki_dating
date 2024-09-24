/** @format */
import { doYouSmoke } from "@/app/constants";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const DoYouSmoke = ({
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
    const doYouSmokeTitles = doYouSmoke.map(({ title }) => title);
    isItemSelect = doYouSmokeTitles.some((item) => selectedItem.includes(item));
    setIsItemSelect(isItemSelect);
  }, [selectedItem[currentStepIndex]]);

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (selectedItem.length >= 7 && currentStepIndex === 6) {
      //console.log(selectedItem.length, currentStepIndex);
      const doYouSmokeItemsInclude = doYouSmoke.map((item) => item.title);
      const checkSelectedItemInclude = doYouSmokeItemsInclude.filter((item) =>
        selectedItem.find((y) => y === item),
      );
      //console.log(checkSelectedItemInclude);
      if (checkSelectedItemInclude.length > 0) {
        //console.log(selectedItem.length, value, checkSelectedItemInclude);
        const updateItemIndex = selectedItem.indexOf(
          checkSelectedItemInclude[0],
        );
        const updateItems = [...selectedItem];
        updateItems[updateItemIndex] = value;
        setSelectedItem([...updateItems]);
        //console.log(updateItems);
      } else {
        //console.log("hi");
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
    }
  };
  //console.log(selectedItem, selectedItem.length);
  return (
    <div className='absolute flex flex-col items-center w-full h-full'>
      <div className='relative bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            Do you smoke...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='overflow-scroll bg-slate-50 flex flex-wrap items-center justify-center gap-2 py-10 h-full px-24'>
        {doYouSmoke.map(({ id, title }) => (
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

export default DoYouSmoke;
