/** @format */

import { bodyType } from "@/app/constants";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Height({
  firstInput,
  secondInput,
  thirdInput,
  setFirstInput,
  setSecondInput,
  setThirdInput,
}: {
  firstInput: string;
  secondInput: string;
  thirdInput: string;
  setFirstInput: Dispatch<SetStateAction<string>>;
  setSecondInput: Dispatch<SetStateAction<string>>;
  setThirdInput: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState<string>("");
  const handleFirstInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,1}$/.test(value)) {
      setFirstInput(value);
    }
  };

  const handleFirstInputBlur = () => {
    // Check if the month is between 1 and 2
    const numericFirstInput = parseInt(firstInput, 10);
    if (numericFirstInput < 1 || numericFirstInput > 2) {
      setError("Please enter a valid height between 100 ~ 250 cm");
      setFirstInput("");
    } else {
      setError(""); // Clear the error if the input is valid
      if (firstInput.length === 1) {
        setFirstInput(firstInput);
      }
    }
  };
  const handleSecondInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      setSecondInput(value);
    }
  };

  const handleSecondInputBlur = () => {
    // Check if the month is between 1 and 9
    const numericFirstInput = parseInt(firstInput, 10);
    if (numericFirstInput < 0 || numericFirstInput > 9) {
      setError("Please enter a valid height between 100 ~ 250 cm");
      setSecondInput("");
    } else {
      setError(""); // Clear the error if the input is valid
      if (firstInput.length === 1) {
        setSecondInput(secondInput);
      }
    }
  };
  const handleThirdInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,1}$/.test(value)) {
      setThirdInput(value);
    }
  };

  const handleThirdInputBlur = () => {
    // Check if the month is between 1 and 2
    const numericFirstInput = parseInt(firstInput, 10);
    if (numericFirstInput < 0 || numericFirstInput > 9) {
      setError("Please enter a valid height between 100 ~ 250 cm");
      setThirdInput("");
    } else {
      setError(""); // Clear the error if the input is valid
      if (firstInput.length === 1) {
        setThirdInput(thirdInput);
      }
    }
  };
  return (
    <div className='flex flex-col items-center'>
      <div className='absolute top-5 bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What is your height...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='relative my-10 bg-slate-50 flex items-center gap-4 py-16 px-36 top-20'>
        <Input
          id='input-one'
          name='input-one'
          type='text'
          maxLength={1}
          value={firstInput}
          onChange={handleFirstInput}
          onBlur={handleFirstInputBlur}
          className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
        />
        <Input
          id='input-two'
          name='input-two'
          type='text'
          maxLength={1}
          value={secondInput}
          onChange={handleSecondInput}
          onBlur={handleSecondInputBlur}
          className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
        />
        <Input
          id='input-three'
          name='input-three'
          type='text'
          maxLength={1}
          value={thirdInput}
          onChange={handleThirdInput}
          onBlur={handleThirdInputBlur}
          className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
        />

        <Label
          htmlFor='message'
          className='text-xl'>
          cm
        </Label>
      </div>
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}

export function BodyType({
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
}) {
  useEffect(() => {
    const bodyTypeTitles = bodyType.map(({ title }) => title);
    isItemSelect = bodyTypeTitles.some((item) => selectedItem.includes(item));
    setIsItemSelect(isItemSelect);
  }, [selectedItem[currentStepIndex]]);

  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (selectedItem.length >= 6 && currentStepIndex === 5) {
      //console.log(selectedItem.length, currentStepIndex);
      const myBodyType = bodyType.map((item) => item.title);
      const checkSelectedItemInclude = myBodyType.filter((item) =>
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
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='absolute top-5 bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            Please choose the one that best suits your body type...
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='relative my-20 top-20 bg-slate-50 flex flex-wrap items-center justify-start gap-1 py-5 px-28'>
        {bodyType.map(({ id, title }) => (
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
}
