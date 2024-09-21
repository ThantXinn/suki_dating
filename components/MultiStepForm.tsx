/** @format */
"use client";

import { livingWithWho } from "@/app/constants";
import { ReactElement, useState } from "react";
import { FcNext, FcOk, FcPrevious } from "react-icons/fc";
import { BodyType, Height } from "./AboutYourBody";
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

  const formElementArray: ReactElement[] = [
    <JobCategory
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />,
    <OffDayCategory
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />,
    <HolidayActivity
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <LivingWithWho
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
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      currentStepIndex={currentStepIndex}
    />,
    <YourType
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
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
  //console.log(selectedItem[currentStepIndex], currentStepIndex);
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
        }  px-7 py-5`}>
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
          disabled={
            currentStepIndex === 3
              ? checkConditionOne({ selectedItem, currentStepIndex })
              : checkConditionTwo({
                  selectedItem,
                  currentStepIndex,
                  firstInput,
                  secondInput,
                  thirdInput,
                })
          }
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

export function checkConditionOne({
  selectedItem,
  currentStepIndex,
}: {
  selectedItem: string[];
  currentStepIndex: number;
}) {
  const isItemsInclude = livingWithWho.filter(
    ({ id, title }) =>
      title == selectedItem[currentStepIndex] ||
      title == selectedItem[currentStepIndex + 1],
  );
  return isItemsInclude.length === 0 ? true : false;
}

export function checkConditionTwo({
  selectedItem,
  currentStepIndex,
  firstInput,
  secondInput,
  thirdInput,
}: {
  selectedItem: string[];
  currentStepIndex: number;
  firstInput: string;
  secondInput: string;
  thirdInput: string;
}) {
  return selectedItem[currentStepIndex] === undefined ||
    (currentStepIndex === 4 &&
      (firstInput === "" || secondInput === "" || thirdInput === ""))
    ? true
    : false;
}
