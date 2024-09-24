/** @format */
"use client";

import { ReactElement, useState } from "react";
import { FcNext, FcOk, FcPrevious } from "react-icons/fc";
import { BodyType, Height } from "./AboutYourBody";
import DoYouSmoke from "./DoYouSmoke";
import HolidayActivity from "./HolidayActivity";
import JobCategory from "./JobCategory";
import LivingWithWho from "./LivingWithWho";
import "./multiStepForm.css";
import OffDayCategory from "./OffDayCategory";
import { Button } from "./ui/button";
import CustomTitle from "./ui/custom-title";
import YourType from "./YourType";

const MultiStepForm = () => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");
  const [thirdInput, setThirdInput] = useState<string>("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isItemSelect, setIsItemSelect] = useState<boolean>(true);

  const formElementArray: ReactElement[] = [
    <JobCategory
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <OffDayCategory
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <HolidayActivity
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <LivingWithWho
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <Height
      firstInput={firstInput}
      setFirstInput={setFirstInput}
      secondInput={secondInput}
      setSecondInput={setSecondInput}
      thirdInput={thirdInput}
      setThirdInput={setThirdInput}
    />,
    <BodyType
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <DoYouSmoke
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <YourType
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
  ];

  function handleOnNext() {
    setCurrentStepIndex((prev) => prev + 1);
  }

  function handleOnBack() {
    setCurrentStepIndex((prev) => prev - 1);
  }

  function MultiStepFormController({
    ele,
    currentStepIndex,
  }: {
    ele: ReactElement[];
    currentStepIndex: number;
  }) {
    //console.log(step);
    switch (currentStepIndex) {
      case 0:
        return <div>{ele[currentStepIndex]}</div>;
      case 1:
        return <div>{ele[currentStepIndex]}</div>;
      case 2:
        return <div>{ele[currentStepIndex]}</div>;
      case 3:
        return <div>{ele[currentStepIndex]}</div>;
      case 4:
        return <div>{ele[currentStepIndex]}</div>;
      case 5:
        return <div>{ele[currentStepIndex]}</div>;
      case 6:
        return <div>{ele[currentStepIndex]}</div>;
      case 7:
        return <div>{ele[currentStepIndex]}</div>;
      default:
        return (
          <div className='flex flex-col items-center justify-center gap-y-5'>
            <CustomTitle
              message='Thank you..'
              className='mt-5'
              spanmessage='Wish your dating will be happy...'
              spanclassName='text-xl'
            />
            <Button>Get Started</Button>
          </div>
        );
    }
  }
  return (
    <div className='relative w-full min-h-96 h-[440px]'>
      <div className='flex items-center w-full justify-between'>
        {formElementArray.map((item, index) => (
          <div
            key={index}
            className={`step-item w-44 ${
              currentStepIndex === index && "active"
            } ${index < currentStepIndex && "complete"}`}>
            <p className='text-sm step'>{index + 1}</p>
          </div>
        ))}
      </div>
      <div className='max-h-96 overflow-scroll scroll-smooth'>
        <MultiStepFormController
          ele={formElementArray}
          currentStepIndex={currentStepIndex}
        />
      </div>
      <div
        className={`absolute bottom-0 right-0 flex w-full ${
          currentStepIndex === 0 ? "justify-end" : "justify-between"
        }  px-7 py-2 bg-slate-50 ${
          formElementArray.length === currentStepIndex
            ? " border-none"
            : " border-t-2 border-black-100/50"
        }`}>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={`${
            currentStepIndex === 0 ||
            formElementArray.length === currentStepIndex
              ? "hidden"
              : "w-10 h-10 bg-slate-300 hover:bg-slate-300/70 rounded-full"
          }`}
          onClick={() => handleOnBack()}>
          <FcPrevious />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          className={`${
            formElementArray.length === currentStepIndex
              ? "hidden"
              : "w-10 h-10 bg-slate-300 hover:bg-slate-300/70 rounded-full"
          }`}
          disabled={controlButtonDisableOrNot({
            isItemSelect,
            currentStepIndex,
            firstInput,
            secondInput,
            thirdInput,
          })}
          onClick={() => handleOnNext()}>
          {formElementArray.length === currentStepIndex + 1 ? (
            <FcOk />
          ) : (
            <FcNext />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;

export function controlButtonDisableOrNot({
  isItemSelect,
  currentStepIndex,
  firstInput,
  secondInput,
  thirdInput,
}: {
  isItemSelect: boolean;
  currentStepIndex: number;
  firstInput: string;
  secondInput: string;
  thirdInput: string;
}) {
  if (currentStepIndex === 4) {
    return currentStepIndex === 4 &&
      (firstInput === "" || secondInput === "" || thirdInput === "")
      ? true
      : false;
  } else {
    // ---> initial render and if user is not select none of these items/values (isItemSelect === true)
    // ---> if isItemSelect is true => next or ok button also true => so user cannnot click this button to continue
    return !isItemSelect;
    // ---> if user select items/values change the initial value of (---isItemSelect(true)=>!isItemSelect(false)---)
  }
}
