/** @format */
"use client";

import { ReactElement, useState } from "react";
import { Height } from "./AboutYourBody";
import HolidayActivity from "./HolidayActivity";
import JobCategory from "./JobCategory";
import LivingWithWho from "./LivingWithWho";
import "./multiStepForm.css";
import OffDayCategory from "./OffDayCategory";
import { Button } from "./ui/button";
import CustomTitle from "./ui/custom-title";

const MultiStepForm = () => {
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
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
    />,
    <LivingWithWho
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />,
    <Height />,
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
  //console.log(currentStepIndex, formElementArray.length);
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
        }  px-7`}>
        <Button
          className={`${currentStepIndex === 0 ? "hidden" : "block"}`}
          onClick={() => handleOnBack()}>
          Back
        </Button>
        <Button
          disabled={selectedItem.length === currentStepIndex ? true : false}
          onClick={() => handleOnNext()}>
          {currentStepIndex === formElementArray.length ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
