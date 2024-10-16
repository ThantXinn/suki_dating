/** @format */
"use client";
import { CreateUserHobsIntsVals } from "@/app/api/server/action";
import { hobbies, intrest, values } from "@/app/constants";
import { type_HobbiesIntrestsValues } from "@/type";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const INITIAL_DATA: type_HobbiesIntrestsValues = {
  userHobbies: [],
  userIntrests: [],
  userValues: [],
};

const HobbyIntrestValuesTab = ({
  sukiUserProfileId,
}: {
  sukiUserProfileId: string;
}) => {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedUserHobbies, setSelectedUserHobbies] = useState<string[]>([]);
  const [selectedUserIntrest, setSelectedUserIntrest] = useState<string[]>([]);
  const [selectedUserValues, setSelectedUserValues] = useState<string[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userHobbies, userIntrests, userValues } = data;
    const totalIndexLength =
      userHobbies.length + userIntrests.length + userValues.length;
    totalIndexLength >= 3 && setDisabled(false);
  };

  function updateUserHobsIntsVals(fields: Partial<type_HobbiesIntrestsValues>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleOnClick = (value: string) => {
    const isHobbiesItem = hobbies.map(({ title }) => title).includes(value);
    const isIntrestsItem = intrest.map(({ title }) => title).includes(value);
    if (isHobbiesItem) {
      const isSelected = selectedUserHobbies.includes(value);
      if (isSelected) {
        setSelectedUserHobbies(
          selectedUserHobbies.filter((item) => item !== value),
        );
        updateUserHobsIntsVals({
          userHobbies: selectedUserHobbies.filter((item) => item !== value),
        });
      } else {
        setSelectedUserHobbies([...selectedUserHobbies, value]);
        updateUserHobsIntsVals({
          userHobbies: [...selectedUserHobbies, value],
        });
      }
    } else if (isIntrestsItem) {
      const isSelected = selectedUserIntrest.includes(value);
      if (isSelected) {
        setSelectedUserIntrest(
          selectedUserIntrest.filter((item) => item !== value),
        );
        updateUserHobsIntsVals({
          userIntrests: selectedUserIntrest.filter((item) => item !== value),
        });
      } else {
        setSelectedUserIntrest([...selectedUserIntrest, value]);
        updateUserHobsIntsVals({
          userIntrests: [...selectedUserIntrest, value],
        });
      }
    } else {
      const isSelected = selectedUserValues.includes(value);
      if (isSelected) {
        setSelectedUserValues(
          selectedUserValues.filter((item) => item !== value),
        );
        updateUserHobsIntsVals({
          userValues: selectedUserValues.filter((item) => item !== value),
        });
      } else {
        setSelectedUserValues([...selectedUserValues, value]);
        updateUserHobsIntsVals({
          userValues: [...selectedUserValues, value],
        });
      }
    }
  };

  const handleOnSubmitClick = async () => {
    await CreateUserHobsIntsVals(data, sukiUserProfileId);
  };

  //console.log(data);
  return (
    <div className='relative h-[380px] w-full flex flex-col items-center justify-center'>
      <form
        onSubmit={handleOnSubmit}
        className='h-full'>
        <Tabs
          defaultValue='hobbies'
          className='w-[470px] h-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger
              value='hobbies'
              className='flex items-center'>
              <p
                className={`${
                  selectedUserHobbies.length !== 0
                    ? "block p-[2px] text-xs bg-sky-400/40 h-5 w-5 text-center rounded-full mr-1"
                    : "hidden"
                }`}>
                {selectedUserHobbies.length}
              </p>
              Hobbies
            </TabsTrigger>
            <TabsTrigger value='intrests'>
              <p
                className={`${
                  selectedUserIntrest.length !== 0
                    ? "block p-[2px] text-xs bg-sky-400/40 h-5 w-5 text-center rounded-full mr-1"
                    : "hidden"
                }`}>
                {selectedUserIntrest.length}
              </p>
              Intrests
            </TabsTrigger>
            <TabsTrigger value='values'>
              <p
                className={`${
                  selectedUserValues.length !== 0
                    ? "block p-[2px] text-xs bg-sky-400/40 h-5 w-5 text-center rounded-full mr-1"
                    : "hidden"
                }`}>
                {selectedUserValues.length}
              </p>
              Values
            </TabsTrigger>
          </TabsList>
          {/* hobbies */}
          <TabsContent
            value='hobbies'
            className='overflow-hidden h-full'>
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-1 pb-16 px-2 overflow-scroll'>
              {hobbies.map(({ id, title, icon }) => (
                <div key={id}>
                  <Button
                    name='userHobbies'
                    variant={"ghost"}
                    className={`flex flex-col items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-32 h-32 rounded-xl ${
                      selectedUserHobbies.includes(title)
                        ? "border-red-400 text-black-100 bg-sky-100/65 cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => {
                      handleOnClick(title);
                    }}>
                    <Image
                      src={icon}
                      alt='icon'
                      width={120}
                      height={120}
                      className='object-contain h-20 w-20'
                    />
                    <p className='text-xs text-wrap'>{title}</p>
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          {/* intrests */}
          <TabsContent
            value='intrests'
            className='overflow-hidden h-full'>
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-1 pb-16 px-2 overflow-scroll'>
              {intrest.map(({ id, title, icon }) => (
                <div key={id}>
                  <Button
                    name='userIntrests'
                    variant={"ghost"}
                    className={`flex flex-col items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer h-32 w-32 rounded-xl ${
                      selectedUserIntrest.includes(title)
                        ? "border-red-400 text-black-100 bg-sky-100/65 cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() => {
                      handleOnClick(title);
                    }}>
                    <Image
                      src={icon}
                      alt='icon'
                      width={120}
                      height={120}
                      className='object-contain h-20 w-20'
                    />
                    <p className='text-xs text-wrap'>{title}</p>
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          {/* values */}
          <TabsContent
            value='values'
            className='overflow-hidden h-full'>
            <div className='w-full h-full flex flex-wrap items-center justify-center gap-1 pb-16 px-2 overflow-scroll'>
              {values.map(({ id, title }) => (
                <div key={id}>
                  <Button
                    name='userValues'
                    variant={"ghost"}
                    className={`flex items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                      selectedUserValues.includes(title)
                        ? "border-red-400 text-black-100 bg-sky-100/65 cursor-pointer"
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
          </TabsContent>
        </Tabs>
        <div className='fixed bottom-10 flex justify-between w-[470px] py-1 px-10'>
          <Button
            disabled={disabled}
            onClick={() => {
              setSelectedUserHobbies([]),
                setSelectedUserIntrest([]),
                setSelectedUserValues([]),
                setDisabled(true);
            }}>
            Reset All
          </Button>
          <Button
            disabled={disabled}
            type='submit'
            onClick={handleOnSubmitClick}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HobbyIntrestValuesTab;
