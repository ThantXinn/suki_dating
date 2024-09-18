/** @format */
"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";

export function CustomBirthDayValidationInput({
  month,
  setMonth,
  day,
  setDay,
  year,
  setYear,
}: {
  month: string;
  setMonth: Dispatch<SetStateAction<string>>;
  day: string;
  setDay: Dispatch<SetStateAction<string>>;
  year: string;
  setYear: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState<string>("");
  const minAge = 18;
  const maxAge = 98;

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Ensure the value only contains numbers and is in MM format
    if (/^\d{0,2}$/.test(value)) {
      setMonth(value);
    }
  };

  const handleMonthBlur = () => {
    // Check if the month is between 1 and 12
    const numericMonth = parseInt(month, 10);
    if (numericMonth < 1 || numericMonth > 12) {
      setError("Please enter a valid month (01-12)");
      setMonth("");
    } else {
      setError(""); // Clear the error if the input is valid

      // Pad single-digit months with '0' (e.g., '7' becomes '07')
      if (month.length === 1) {
        setMonth("0" + month);
      }
    }
  };

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Ensure the value only contains numbers and is in DD format
    if (/^\d{0,2}$/.test(value)) {
      setDay(value);
    }
  };

  const handleDayBlur = () => {
    // Check if the day is between 1 and 31
    const numericDay = parseInt(day, 10);
    if (numericDay < 1 || numericDay > 31) {
      setError("Please enter a valid day (01-31)");
      setDay("");
    } else {
      setError(""); // Clear the error if the input is valid
      // Pad single-digit days with '0' (e.g., '7' becomes '07')
      if (day.length === 1) {
        setDay("0" + day);
      }
    }
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Ensure the value only contains numbers and is in YYYY format
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
    }
  };

  const handleYearBlur = () => {
    // Check if the YYYY is less than 18 from current year
    const numericYear = parseInt(year, 10);
    const currentYear = new Date();
    const validYear = currentYear.getFullYear() - numericYear;
    if (validYear < minAge || validYear > maxAge) {
      setError("Sorry The service is not available under the age of 18.");
      setYear("");
    } else {
      setError(""); // Clear the error if the input is valid
      // Pad single-digit days with '0' (e.g., '7' becomes '07')
      if (Number.isNaN(numericYear)) {
        setYear("");
      } else {
        setYear(numericYear.toString());
      }
    }
  };
  return (
    <div className='grid w-full max-w-sm items-center gap-2'>
      <div className='space-x-2'>
        <Label htmlFor='title'>Birthday</Label>
        <span className='text-[10px] text-red-500'>
          If it is incorrect, you cannot use the service.
        </span>
      </div>
      <div className='flex w-fit space-x-3 items-center justify-between'>
        <div className='grid w-16 max-w-sm items-center gap-1.5'>
          <Label htmlFor='month'>Month</Label>
          <Input
            name='month'
            type='text'
            id='month-input'
            value={month}
            maxLength={2}
            onChange={handleMonthChange}
            onBlur={handleMonthBlur} // Add padding on blur
            placeholder='MM'
            required
            className='text-center'
          />
        </div>
        <div className='grid w-16 max-w-sm items-center gap-1.5'>
          <Label htmlFor='day'>Day</Label>
          <Input
            name='day'
            type='text'
            id='day-input'
            value={day}
            maxLength={2}
            onChange={handleDayChange}
            onBlur={handleDayBlur} // Add padding on blur
            placeholder='DD'
            required
            className='text-center'
          />
        </div>
        <div className='grid w-16 max-w-sm items-center gap-1.5'>
          <Label htmlFor='year'>Year</Label>
          <Input
            name='year'
            type='text'
            id='day-input'
            value={year}
            maxLength={4}
            onChange={handleYearChange}
            onBlur={handleYearBlur} // Add padding on blur
            placeholder='YYYY'
            required
            className='text-center'
          />
        </div>
        {/* Display error message if the input is invalid */}
      </div>
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}

export function CustomNameValidationInput({
  username,
  setUserName,
  isError,
  setIsError,
}: {
  username: string;
  setUserName: Dispatch<SetStateAction<string>>;
  isError: string;
  setIsError: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState<string>("");
  const specialCharErr = "Special characters are not allowed.";
  const fillNameErr = "Pleae enter nick name";

  // Regex for detecting special characters
  const specialCharRegex = /[^a-zA-Z0-9 ]/g;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value); // Update the input value

    // Check if the input contains special characters
    if (specialCharRegex.test(value)) {
      setError(specialCharErr); // Show error if special characters are found
      setIsError(specialCharErr);
    } else if (value === "") {
      setError(fillNameErr);
      setIsError(fillNameErr);
    } else {
      setError(""); // Clear error if input is valid
      setIsError("");
    }
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='name'>Nick Name</Label>
      <Input
        type='text'
        id='name'
        name='nickname'
        value={username}
        onChange={handleInputChange}
        placeholder='Nick Name'
        required
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}

export function CustomEmailValidationInput({
  user_Email,
  email,
  setEmail,
}: {
  user_Email?: string;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}) {
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setEmail(value);

    // Check if the input is not empty or not
    if (value === "") {
      setError("Pleae enter your email");
    } else {
      setError(""); // Clear error if input is valid
    }
  };
  // Check if there is an error
  //setIsError(error);
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='email'>Email</Label>
      <Input
        type='email'
        id='email'
        name='email'
        value={user_Email ? user_Email : email}
        readOnly={user_Email ? true : false}
        onChange={handleEmailChange}
        placeholder={user_Email ? user_Email : "example@gmail.com"}
        required
        className=''
      />
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  );
}
