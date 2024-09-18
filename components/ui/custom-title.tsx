/** @format */

import { Label } from "./label";

const CustomTitle = ({
  message,
  spanmessage,
  className,
  spanclassName,
}: {
  message: string;
  spanmessage?: string;
  className?: string;
  spanclassName?: string;
}) => {
  return (
    <Label
      htmlFor='title'
      className='xl:text-6xl lg:text-5xl font-bold text-3xl text-center max-sm:text-start text-transparent flex flex-col justify-center space-y-3 py-2 max-sm:space-y-1'>
      <p className={`gradient-text capitalize ${className}`}>{message}</p>
      <span
        className={`${
          spanmessage !== undefined ? "block" : "hidden"
        } ${spanclassName} ${className} gradient-text py-1`}>
        {spanmessage}
      </span>
    </Label>
  );
};

export default CustomTitle;
