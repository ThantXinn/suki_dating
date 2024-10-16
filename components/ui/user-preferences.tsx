/** @format */

import Image from "next/image";
import { Button } from "./button";

const UserPreferencesBox = ({
  title,
  icon,
  name,
  id,
}: {
  title: string;
  icon: string;
  name: string;
  id: number;
}) => {
  return (
    <Button
      key={id}
      name={name}
      variant={"ghost"}
      className={`flex flex-col items-center p-2 gap-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-32 h-32 rounded-xl }`}>
      {icon !== "" && (
        <Image
          src={icon}
          alt='icon'
          width={120}
          height={120}
          className='object-contain h-20 w-20'
        />
      )}
      <p className='text-xs text-wrap'>{title}</p>
    </Button>
  );
};

export default UserPreferencesBox;
