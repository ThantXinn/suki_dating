/** @format */
"use client";
import { UpdateSukiUserIntro } from "@/app/api/server/action";
import { useRef, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const SetupMyIntroForm = ({
  title,
  content,
  sukiUserProfileId,
}: {
  title: string;
  content: string;
  sukiUserProfileId: string;
}) => {
  const maxContentText = 380;
  const maxtTitleText = 70;
  const [setupTitle, setSetupTitle] = useState<string>(title);
  const [setupContent, setSetupContent] = useState<string>(content);
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [titleTextCount, setTitleTextCount] = useState<number>(
    maxtTitleText - title.length,
  );
  const [contentTextCount, setContentTextCount] = useState<number>(
    maxContentText - content.length,
  );

  const handleOnClick = () => {
    if (inputRef.current) {
      const inputLength = inputRef.current.value.length;
      inputRef.current.setSelectionRange(inputLength, inputLength);
      inputRef.current.focus();
    }
  };

  return (
    <div className='relative w-full'>
      <form
        action={UpdateSukiUserIntro}
        className='w-full flex flex-col items-end justify-center space-y-12 px-7 my-28'>
        {/* for async data to server */}
        <Input
          type='hidden'
          name='sukiUserProfileId'
          value={sukiUserProfileId}
        />
        <Input
          type='hidden'
          name='title'
          value={setupTitle}
        />
        <Input
          type='hidden'
          name='content'
          value={setupContent}
        />
        {/* for async data to server */}
        <div className='flex items-center justify-between gap-x-3 w-full'>
          <div className='relative flex w-full'>
            <Input
              name='title'
              type='text'
              maxLength={maxtTitleText}
              value={setupTitle}
              ref={inputRef}
              disabled={isEnable}
              onChange={(e) => {
                setTitleTextCount(maxtTitleText - e.target.value.length),
                  setSetupTitle(e.target.value);
              }}
              className={`${
                isEnable
                  ? "border-none focus:cursor-not-allowed"
                  : " border-sky-600/50 cursor-default"
              } transition-all duration-100 text-2xl font-light text-black-400 focus-visible:ring-sky-600/50 py-5 shadow-none`}
            />

            <p className='absolute left-1 -bottom-5 text-red-600/80 text-[10px] line-height-[12px] font-semibold mt-3'>
              Maximum title length is {maxtTitleText}
            </p>
            <p className='absolute right-1 -bottom-5 text-[10px] line-height-[12px] text-muted-foreground font-semibold mt-3'>
              {titleTextCount ? maxtTitleText - titleTextCount : 0}/
              {titleTextCount}
            </p>
          </div>
          <Button
            type='button'
            className='flex items-center justify-between gap-x-3 py-5'
            onClick={() => {
              setIsEnable((prev) => !prev), handleOnClick;
            }}>
            Edit
            <FaPenToSquare size={14} />
          </Button>
        </div>
        <div className='relative w-full'>
          <Textarea
            name='content'
            maxLength={maxContentText}
            value={setupContent}
            disabled={isEnable}
            className='max-h-56 min-h-32 text-lg font-light focus-visible:ring-sky-600/50'
            onChange={(e) => {
              setContentTextCount(maxContentText - e.target.value.length),
                setSetupContent(e.target.value);
            }}
          />
          <p className='absolute left-1 -bottom-5 text-red-600/80 text-[10px] line-height-[12px] font-semibold mt-3'>
            Maximum intro message length is {maxContentText}
          </p>
          <p className='absolute right-1 -bottom-5 text-sm text-muted-foreground font-semibold mt-3'>
            {contentTextCount ? maxContentText - contentTextCount : 0}/
            {contentTextCount}
          </p>
        </div>
        <Button
          type={`${
            title === setupTitle && content === setupContent
              ? "button"
              : "submit"
          }`}
          onClick={() => {
            setIsEnable(true);
          }}
          className='flex items-center justify-between gap-x-3'>
          {title === setupTitle && content === setupContent ? "Keep" : "Save"}
          <IoCheckmarkDoneSharp />
        </Button>
      </form>
    </div>
  );
};

export default SetupMyIntroForm;
