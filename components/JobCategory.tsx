/** @format */
"use client";
import { jobs } from "@/app/constants";
import { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";

const JobCategory = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: string[];
  setSelectedItem: Dispatch<SetStateAction<string[]>>;
}) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='sticky top-0 bg-slate-50 w-full'>
        <Label htmlFor='sub-title'>
          <h1 className='text-2xl text-center font-semibold py-5'>
            What kind of work do you do...?
          </h1>
        </Label>
        <hr className='w-full border border-slate-500' />
      </div>
      <div className='flex flex-wrap items-center justify-start gap-1 py-5 px-36'>
        {jobs.map(({ id, title, desc }) => (
          <div key={id}>
            <div
              className={`p-2 border border-black-100 text-slate-700 hover:border-red-400 hover:cursor-pointer w-fit rounded-full ${
                selectedItem?.includes(title)
                  ? "border-red-400 text-black-100 bg-slate-200"
                  : ""
              }`}
              onClick={() => setSelectedItem([title])}>
              <p className='text-sm'>{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategory;
