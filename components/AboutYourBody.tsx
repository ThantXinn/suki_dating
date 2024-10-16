/** @format */

import { bodyType } from "@/app/constants";
import {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type heightCategoryData = {
  bodyHeightCategory: {
    firstInput: string;
    secondInput: string;
    thirdInput: string;
  };
};

export function Height({
  icon,
  bodyHeightCategory,
  updateMultiFormData,
}: {
  icon: ReactElement;
  bodyHeightCategory: {
    firstInput: string;
    secondInput: string;
    thirdInput: string;
  };
  updateMultiFormData: (fields: Partial<heightCategoryData>) => void;
}) {
  const [error, setError] = useState<string>("");
  const [firstInputState, setFirstInputState] = useState<string>(
    bodyHeightCategory.firstInput,
  );
  const [secondInputState, setSecondInputState] = useState<string>(
    bodyHeightCategory.secondInput,
  );
  const [thirdInputState, setThirdInputState] = useState<string>(
    bodyHeightCategory.thirdInput,
  );
  const showErrorMessage: string =
    "Please enter a valid height between 100 ~ 270 cm";

  const handleFirstInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,1}$/.test(value)) {
      setFirstInputState(value);
    }

    if (Number(value) > 2) {
      setError(showErrorMessage);
      setFirstInputState("");
    } else {
      if (Number(secondInputState) > 7 && Number(value) > 1) {
        setError(showErrorMessage);
        setFirstInputState("");
      } else {
        if (Number(thirdInputState) >= 1 && Number(value) > 2) {
          setError(showErrorMessage);
          setFirstInputState("");
        } else {
          if (
            Number(thirdInputState) > 0 &&
            Number(secondInputState) >= 7 &&
            Number(value) >= 2
          ) {
            setError(showErrorMessage);
            setFirstInputState("");
          } else {
            setFirstInputState(value);
            updateMultiFormData({
              bodyHeightCategory: {
                firstInput: value,
                secondInput: secondInputState,
                thirdInput: thirdInputState,
              },
            });
          }
        }
      }
    }
  };

  const handleSecondInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      setSecondInputState(value);
    }

    if (Number(firstInputState) >= 2 && Number(value) > 7) {
      setError(showErrorMessage);
      setSecondInputState("");
    } else {
      setSecondInputState(value);
      updateMultiFormData({
        bodyHeightCategory: {
          firstInput: firstInputState,
          secondInput: value,
          thirdInput: thirdInputState,
        },
      });
    }
  };

  const handleThirdInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,1}$/.test(value)) {
      setThirdInputState(value);
    }

    if (
      Number(firstInputState) >= 2 &&
      Number(secondInputState) >= 7 &&
      Number(value) > 0
    ) {
      setError(showErrorMessage);
      setThirdInputState("");
    } else {
      setThirdInputState(value);
      updateMultiFormData({
        bodyHeightCategory: {
          firstInput: firstInputState,
          secondInput: secondInputState,
          thirdInput: value,
        },
      });
    }
  };

  return (
    <div className='absolute flex flex-col items-center w-full h-full'>
      <div className='relative bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What is your height...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='relative bg-slate-50 flex flex-col justify-center items-center px-36 w-full h-full'>
        <div className='flex items-center justify-center gap-4'>
          <Input
            id='input-one'
            name='input-one'
            type='text'
            maxLength={1}
            value={bodyHeightCategory.firstInput}
            onChange={handleFirstInput}
            className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
          />
          <Input
            id='input-two'
            name='input-two'
            type='text'
            maxLength={1}
            value={bodyHeightCategory.secondInput}
            onChange={handleSecondInput}
            className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
          />
          <Input
            id='input-three'
            name='input-three'
            type='text'
            maxLength={1}
            value={bodyHeightCategory.thirdInput}
            onChange={handleThirdInput}
            className='text-2xl text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
          />

          <Label
            htmlFor='message'
            className='text-xl'>
            cm
          </Label>
        </div>
        <div className='absolute bottom-10'>
          {error && <p className='text-red-500 text-xs py-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}

// --------------- Body Type ----------------- //
type bodyCategoryData = {
  bodyTypeCategory: string;
};
export function BodyType({
  icon,
  bodyTypeCategory,
  updateMultiFormData,
  isItemSelect,
  setIsItemSelect,
}: {
  icon: ReactElement;
  bodyTypeCategory: string;
  updateMultiFormData: (fields: Partial<bodyCategoryData>) => void;
  isItemSelect: boolean;
  setIsItemSelect: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const bodyTypeTitles = bodyType.map(({ title }) => title);
    isItemSelect = bodyTypeTitles.includes(bodyTypeCategory);
    setIsItemSelect(isItemSelect);
  }, [bodyTypeCategory]);

  /*
  //console.log(selectedItem.length, selectedItem, currentStepIndex);
  const handleOnClick = (value: string) => {
    const isSelected = selectedItem.includes(value);
    if (isSelected) {
      setSelectedItem(selectedItem.filter((item) => item !== value));
    } else {
      setSelectedItem([...selectedItem, value]);
    }
    if (selectedItem.length >= 5 && currentStepIndex === 5) {
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
        newItemsUpdate[currentStepIndex] = updateUserClickedItem;

        //after replaced final user selected item to previous selected item
        //console.log(newItemsUpdate, updateUserClickedItem);
        setSelectedItem([...newItemsUpdate]);
        //console.log(newItemsUpdate);
      }
    }
  };
  */
  return (
    <div className='absolute flex flex-col items-center w-full h-full'>
      <div className='relative bg-slate-50 w-full z-10'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5 flex flex-col justify-center items-center'>
            Please choose the one that best suits your body type...
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className=' bg-slate-50 flex flex-wrap items-center justify-center gap-2 py-28 px-28 w-fit h-full'>
        {bodyType.map(({ id, title }) => (
          <div key={id}>
            <Button
              variant={"ghost"}
              className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                bodyTypeCategory === title
                  ? "border-red-400 text-black-100 bg-slate-200 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                updateMultiFormData({ bodyTypeCategory: title });
              }}>
              <p className='text-sm'>{title}</p>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
