/** @format */
"use client";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import React from "react";
import PhotoAlbum from "./PhotoAlbum";
import CustomTitle from "./ui/custom-title";

const CoupleStory = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  const profileSetupInstruction = [
    {
      id: 0,
      main_title: "Story No ",
      sub_title: "Story Title ",
      content: "Tell me you story",
      photoUrl: "",
    },
    {
      id: 1,
      main_title: "Story No ",
      sub_title: "Story Title ",
      content: "Tell me you story",
      photoUrl: "",
    },
    {
      id: 2,
      main_title: "Story No ",
      sub_title: "Story Title ",
      content: "Tell me you story",
      photoUrl: "",
    },
  ];

  return (
    <div
      id='story'
      className='relative py-12 w-screen flex justify-center items-center'>
      <div
        id='content'
        className='mx-auto w-full flex flex-col items-center justify-center'>
        <div
          id='title'
          className='w-2/3 max-sm:w-full px-10 max-sm:px-7 py-7 max-sm:py-2'>
          <CustomTitle
            message='10,000 new couples'
            spanmessage='are born every month'
          />
        </div>
        <div
          id='message'
          className='w-[75%] space-y-3 max-sm:w-full px-10 py-7 max-sm:py-0 max-sm:px-7 mt-7 max-sm:mt-2 flex justify-center text-center max-sm:text-start'>
          <p className='lg:text-xl'>
            Suki offers a wide range of features that allow you to meet people
            based on hobbies, values, etc.
            <span> Why not find a wonderful partner on Suki,</span>
            where it's easy to find the perfect match for you?
          </p>
        </div>
        <PhotoAlbum
          autoPlayControl={true}
          loopControl={true}
          photoAndInstruction={profileSetupInstruction}
        />
        <div className='mt-12'>
          <Link
            href={"/couple-story"}
            className='rounded-full p-4 text-lg font-semibold text-primary border-primary border-2 hover:bg-slate-50'>
            View Couple Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoupleStory;
