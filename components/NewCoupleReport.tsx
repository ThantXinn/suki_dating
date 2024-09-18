/** @format */

import { Button } from "./ui/button";
import CustomTitle from "./ui/custom-title";
import { Label } from "./ui/label";
import { LayoutGrid } from "./ui/layout-grid";

const NewCoupleReport = () => {
  return (
    <div
      id='couple_report'
      className='w-screen mx-auto relative'>
      <div
        id='couple_report_container'
        className='w-full md:px-24 py-10 px-7 max-sm:py-0 flex lg:flex-row flex-col-reverse justify-between lg:gap-x-10 gap-x-2 gap-y-2'>
        <div
          id='couple_report_left_container'
          className='lg:w-1/2 w-full'>
          <div className='h-[440px] lg:h-full'>
            <LayoutGrid cards={cards} />
          </div>
        </div>
        <div
          id='couple_report_right_container'
          className='relative lg:w-1/2 w-full'>
          <div
            id='couple_report_container_title'
            className='mb-10'>
            <CustomTitle
              message='New Couple'
              className='text-start text-4xl'
            />
          </div>
          <div id='couple_report_container_content'>
            <Label htmlFor='message'>
              <p className='max-sm:text-xl text-2xl font-semibold leading-9 text-pretty'>
                Connect with like-minded people based on what you want to do and
                where you want to go
              </p>
            </Label>
            <p className='py-5 text-pretty text-lg'>
              You can add a wide variety of date plans to your profile, such as
              popular movies and interesting spots. Date plans can lead to
              specific topics&apos; making messages and dates more exciting.
            </p>
          </div>
          <Button
            variant={"default"}
            className=' p-7 flex justify-center rounded-full text-lg font-bold text-white'>
            View Couple Report
          </Button>
        </div>
      </div>
    </div>
  );
};

const SkeletonOne = () => {
  return (
    <div>
      <p className='font-bold md:text-lg text-sm text-white'>
        House in the woods
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className='font-bold md:text-lg text-sm text-white'>
        House above the clouds
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        Perched high above the world, this house offers breathtaking views and a
        unique living experience.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className='font-bold md:text-lg text-sm text-white'>Greens all over</p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className='font-bold md:text-lg text-sm text-white'>
        Rivers are serene
      </p>
      <p className='font-normal text-base text-white'></p>
      <p className='font-normal text-base my-4 max-w-lg text-neutral-200'>
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default NewCoupleReport;
