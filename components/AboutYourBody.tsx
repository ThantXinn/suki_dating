/** @format */

import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Height() {
  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");
  const [thirdInput, setThirdInput] = useState<string>("");
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
      <div className='sticky top-0 bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What is your height...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='flex items-center gap-4 py-5 px-36 mt-20'>
        <Input
          id='input-one'
          name='input-one'
          type='text'
          maxLength={1}
          value={firstInput}
          onChange={handleFirstInput}
          onBlur={handleFirstInputBlur}
          className='text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
        />
        <Input
          id='input-two'
          name='input-two'
          type='text'
          maxLength={1}
          value={secondInput}
          onChange={handleSecondInput}
          onBlur={handleSecondInputBlur}
          className='text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
        />
        <Input
          id='input-three'
          name='input-three'
          type='text'
          maxLength={1}
          value={thirdInput}
          onChange={handleThirdInput}
          onBlur={handleThirdInputBlur}
          className='text-center border-b-2 rounded-none border-t-0 border-r-0 border-l-0 shadow-none w-10 border-slate-500/50 focus-visible:ring-0'
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

export function BodyType() {
  return <div>Body Type</div>;
}
