/** @format */
"use client";

import { config } from "@/lib/config";
import { MultiFormData } from "@/type";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { FaSmoking, FaUserGraduate } from "react-icons/fa";
import { FaHouseSignal, FaPersonCircleQuestion } from "react-icons/fa6";
import { FcNext, FcOk, FcPrevious } from "react-icons/fc";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosBody } from "react-icons/io";
import {
  MdAttachMoney,
  MdOutlineEditCalendar,
  MdOutlineSportsBaseball,
  MdWork,
} from "react-icons/md";
import { BodyType, Height } from "./AboutYourBody";
import DoYouSmoke from "./DoYouSmoke";
import HolidayActivity from "./HolidayActivity";
import JobCategory from "./JobCategory";
import LivingWithWho from "./LivingWithWho";
import "./multiStepForm.css";
import OffDayCategory from "./OffDayCategory";
import { Button } from "./ui/button";
import CustomTitle from "./ui/custom-title";
import YourEducation from "./YourEducation";
import YourInCome from "./YourInCome";
import YourType from "./YourType";

// multisetup form references youtube link ---> https://www.youtube.com/watch?v=uDCBSnWkuH0&t=1023s

const INITIAL_DATA: MultiFormData = {
  jobCategory: "",
  offDayCategory: "",
  offDayActivityCategory: [],
  livingCategory: "",
  bodyHeightCategory: {
    firstInput: "",
    secondInput: "",
    thirdInput: "",
  },
  bodyTypeCategory: "",
  smokingCategory: "",
  personTypeCategory: [],
  incomeCategory: "",
  educationCategory: "",
};
const MultiStepForm = ({ userId }: { userId: string }) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isItemSelect, setIsItemSelect] = useState<boolean>(true);

  const formElementArray: ReactElement[] = [
    <JobCategory
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<MdWork />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <OffDayCategory
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<MdOutlineEditCalendar />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <HolidayActivity
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<MdOutlineSportsBaseball />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <LivingWithWho
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<FaHouseSignal />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <Height
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<GiBodyHeight />}
    />,
    <BodyType
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<IoIosBody />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <DoYouSmoke
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<FaSmoking />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <YourType
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<FaPersonCircleQuestion />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <YourInCome
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<MdAttachMoney />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
    <YourEducation
      {...data}
      updateMultiFormData={updateMultiFormData}
      icon={<FaUserGraduate />}
      isItemSelect={isItemSelect}
      setIsItemSelect={setIsItemSelect}
    />,
  ];

  const isSukiUserExit = async () => {
    const res = await fetch(`${config.apibaseUrl}/userProfile/${userId}`);
    const { isUserProfileExit } = await res.json();
    isUserProfileExit && setCurrentStepIndex(formElementArray.length);
  };

  useEffect(() => {
    isSukiUserExit();
  }, [userId]);

  function updateMultiFormData(fields: Partial<MultiFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  async function updateUserProfile() {
    const {
      jobCategory,
      offDayCategory,
      offDayActivityCategory,
      livingCategory,
      bodyHeightCategory,
      bodyTypeCategory,
      smokingCategory,
      personTypeCategory,
      incomeCategory,
      educationCategory,
    } = data;

    const res = await fetch(`${config.apibaseUrl}/userProfile/${userId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        jobCategory: jobCategory,
        offDayCategory: offDayCategory,
        offDayActivityCategory: offDayActivityCategory,
        livingCategory: livingCategory,
        bodyHeightCategory: bodyHeightCategory,
        bodyTypeCategory: bodyTypeCategory,
        smokingCategory: smokingCategory,
        personTypeCategory: personTypeCategory,
        incomeCategory: incomeCategory,
        educationCategory: educationCategory,
      }),
    });
  }

  function isCompleteSetup() {
    return formElementArray.length === currentStepIndex + 1;
  }

  function handleOnNext() {
    setCurrentStepIndex((prev) => prev + 1);
    isCompleteSetup() && updateUserProfile();
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
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 1:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 2:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 3:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 4:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 5:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 6:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 7:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 8:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      case 9:
        return (
          <div className='h-full overflow-hidden relative flex items-center justify-center'>
            {ele[currentStepIndex]}
          </div>
        );
      default:
        return (
          <div className='flex flex-col items-center justify-center gap-y-5 py-7'>
            <CustomTitle
              message={`Thank you ...`}
              className='mt-5 px-12 bg-slate-300'
              spanmessage='Upload your best photo and let your personality shine! 
              A great profile picture makes it easier to connect and find your perfect match. 
              Start now and get closer to meeting someone special!'
              spanclassName='text-lg font-light px-36 py-12 text-center leading-normal'
            />
            <div className='flex items-center justify-between w-full px-36 gap-7 '>
              <Button>
                <Link href={`${config.nextpublicbaseUrl}/onboarding/photo`}>
                  Upload Photo
                </Link>
              </Button>
              <Button>
                <Link
                  href={`${config.nextpublicbaseUrl}/onboarding/self-intro`}>
                  Skip Photo
                </Link>
              </Button>
            </div>
          </div>
        );
    }
  }

  function controlButtonDisableOrNot(
    isItemSelect: boolean,
    currentStepIndex: number,
  ) {
    const { firstInput, secondInput, thirdInput } = data.bodyHeightCategory;
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

  return (
    <div className='relative w-full min-h-[480px] h-full'>
      <div className='flex items-center w-full h-7 justify-between'>
        {formElementArray.map((item, index) => (
          <div
            key={index}
            className={`step-item w-44 ${
              currentStepIndex === index && "active"
            } ${index < currentStepIndex && "complete"}`}>
            <p className='text-xs step'>{item.props.icon}</p>
          </div>
        ))}
      </div>
      <div className='h-[400px] w-full overflow-hidden'>
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
              : `w-10 h-10 ${
                  isCompleteSetup()
                    ? " bg-green-600/90 hover:bg-green-600/70 "
                    : "bg-slate-300 hover:bg-slate-300/70"
                }  rounded-full`
          }`}
          disabled={controlButtonDisableOrNot(isItemSelect, currentStepIndex)}
          onClick={() => {
            handleOnNext();
          }}>
          {formElementArray.length === currentStepIndex + 1 ? (
            <FcOk size={isItemSelect ? 20 : 15} />
          ) : (
            <FcNext />
          )}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
