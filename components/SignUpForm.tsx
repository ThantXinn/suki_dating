/** @format */
"use client";
import { CreateSukiUser } from "@/app/api/server/action";
import { gender } from "@/app/constants";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  CustomBirthDayValidationInput,
  CustomEmailValidationInput,
  CustomNameValidationInput,
} from "./ui/custom-validation-input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SignUpForm = ({
  userEmail,
  userId,
}: {
  userEmail?: string;
  userId?: string;
}) => {
  const [selectedGender, setSelectedGender] = useState("");
  const [acceptTermCondition, setAcceptTermCondition] = useState(false);
  const [overEightenSingle, setOverEightenSingle] = useState(false);
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>(userEmail ? userEmail : "");
  const [isError, setIsError] = useState<string>(""); // State to hold any validation error
  const isFormComplete = (): boolean => {
    return (
      acceptTermCondition === true &&
      overEightenSingle === true &&
      selectedGender !== "" &&
      month !== "" &&
      day !== "" &&
      year !== "" &&
      username !== "" &&
      email !== "" &&
      isError === ""
    );
  };

  return (
    <div className='w-2/3 mx-auto px-10 lg:px-32'>
      <form action={CreateSukiUser}>
        <input
          type='hidden'
          name='userId'
          value={userId}
        />
        <div className='w-full space-y-5'>
          <CustomNameValidationInput
            username={username}
            setUserName={setUserName}
            isError={isError}
            setIsError={setIsError}
          />
          <CustomEmailValidationInput
            email={userEmail ? userEmail : email}
            setEmail={setEmail}
          />
          <div className='z-20'>
            <Label htmlFor='label'>Gender</Label>
            <Select
              name='gender'
              required
              value={selectedGender}
              onValueChange={(value) => setSelectedGender(value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {gender.map(({ id, title, value }) => (
                    <div key={id}>
                      <SelectItem value={value}>{title}</SelectItem>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <CustomBirthDayValidationInput
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            year={year}
            setYear={setYear}
          />

          <div className='flex flex-col space-y-2 justify-center'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='terms1'
                name='checkbox1'
                defaultChecked={overEightenSingle}
                onClick={() => setOverEightenSingle((prev) => !prev)}
              />
              <Label
                htmlFor='message1'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                I&apos;m over 18 and single.
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='terms2'
                name='checkbox2'
                defaultChecked={acceptTermCondition}
                onClick={() => setAcceptTermCondition((prev) => !prev)}
              />
              <Label
                htmlFor='message2'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Accept terms and conditions
              </Label>
            </div>
            <div className='grid gap-1.5 leading-none'>
              <p className='text-sm text-muted-foreground'>
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        <Button
          type='submit'
          disabled={isFormComplete() ? false : true}
          className='w-full mt-5'>
          Next
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
