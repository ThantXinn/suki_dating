/** @format */

"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import coverPhoto from "@/public/coverphoto.jpg";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

const PhotoAlbum = ({
  customClassName,
  autoPlayControl,
  loopControl,
  photoAndInstruction,
}: {
  customClassName?: string;
  autoPlayControl: boolean;
  loopControl: boolean;
  photoAndInstruction?: {
    id: number;
    main_title: string;
    sub_title: string;
    content: string;
    photoUrl: string;
  }[];
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div
      id='photo-album'
      className={cn(
        `mt-7 w-screen flex items-center justify-center py-5 mx-auto`,
        customClassName,
      )}>
      <Carousel
        opts={{
          align: "center",
          loop: loopControl,
        }}
        plugins={autoPlayControl ? [plugin.current] : []}
        className='w-full'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}>
        <CarouselContent>
          {photoAndInstruction?.map(
            ({ id, main_title, sub_title, content, photoUrl }) => (
              <CarouselItem key={id}>
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
                            {main_title} {id + 1}#
                          </h1>
                          <h3 className='text-xl font-bold text-white'>
                            {sub_title}
                          </h3>
                          <p className='text-white font-light text-start'>
                            {content}
                          </p>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ),
          )}
        </CarouselContent>
        <CarouselPrevious className='left-12 max-sm:hidden w-14 h-14' />
        <CarouselNext className='right-12 max-sm:hidden w-14 h-14' />
      </Carousel>
    </div>
  );
};

export default PhotoAlbum;
