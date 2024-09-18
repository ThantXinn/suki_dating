/** @format */
"use client";
import coverPhoto from "@/public/coverphoto.jpg";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import CustomTitle from "./ui/custom-title";
import { Label } from "./ui/label";

const CoupleStory = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );
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
        <div
          id='photo-album'
          className='mt-7 w-screen flex items-center justify-center py-5 mx-auto'>
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[plugin.current]}
            className='w-full'
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}>
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className='h-[440px]'>
                      <CardContent className='relative flex h-full items-center justify-center rounded-xl p-0 overflow-hidden'>
                        <Image
                          src={coverPhoto}
                          alt='coverPhoto'
                          className='object-cover h-full'
                        />
                        <div className='absolute left-0 bottom-3 h-[150px] w-full px-3'>
                          <Label
                            htmlFor='message'
                            className='w-full space-y-2 flex flex-col items-start justify-center'>
                            <h1 className='text-lg font-bold text-white bg-gradient-to-br from-[#fc5c6c] via-[#86f] to-[#00c2da] p-0.5'>
                              Story No {index + 1}#
                            </h1>
                            <h3 className='text-xl font-bold text-white'>
                              Story Title
                            </h3>
                            <p className='text-white font-light text-start'>
                              Tell me your story Tell me your story Tell me your
                              story
                            </p>
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-12 max-sm:hidden w-14 h-14' />
            <CarouselNext className='right-12 max-sm:hidden w-14 h-14' />
          </Carousel>
        </div>
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
