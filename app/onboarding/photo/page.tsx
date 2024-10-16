/** @format */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import UploadImage from "@/components/UploadImage";
import UploadImageDisplay from "@/components/UploadImageDisplay";
import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { isValidSukiUser } from "@/lib/error";
import close_up from "@/public/closeup.jpg";
import coverPhoto from "@/public/coverphoto.jpg";
import dimly_lit from "@/public/dimly_lit.jpg";
import food from "@/public/food.jpg";
import { type_serarchResultImages } from "@/type";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import cloudinary from "cloudinary";
import Image from "next/image";
import Link from "next/link";

const Photo = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const sukiUserProfile = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  isValidSukiUser(user, sukiUserProfile?.id!);

  const { profilePhotoUrl } = sukiUserProfile!;

  const imagesResult = (await cloudinary.v2.search
    .expression("folder:sukiDating AND resource_type:image")
    .sort_by("public_id", "desc")
    .max_results(1)
    .execute()) as { resources: type_serarchResultImages[] };

  const photoAndInstructionsEleArray = [
    <CardContent className='relative flex flex-col h-full items-center justify-center rounded-xl p-0 overflow-hidden bg-sky-50/50'>
      <h1 className='absolute top-7 text-lg font-bold px-10 py-1 text-center'>
        It is important to register a face photo for matching
      </h1>
      <Image
        src={coverPhoto}
        alt='coverPhoto'
        className='object-cover h-56 w-56 rounded-xl'
      />
      <div className='absolute left-0 bottom-0 h-[100px] w-full px-3'>
        <Label
          htmlFor='message'
          className='w-full space-y-2 flex flex-col items-center justify-center'>
          <h3 className='text-lg font-normal'>When you set a face photo</h3>
          <p className='font-medium text-lg'>
            Matching rate increased{" "}
            <span className='text-2xl font-bold text-transparent gradient-text bg-gradient-to-br from-[#fc5c6c] via-[#86f] to-[#00c2da]'>
              by 3 times !
            </span>
          </p>
        </Label>
      </div>
    </CardContent>,
    <CardContent className='relative flex h-full items-center justify-center rounded-xl p-0 overflow-hidden bg-sky-50/75'>
      <h1 className='absolute top-7 text-lg font-bold px-10 py-1 text-center'>
        "3 photos that are difficult to match"
      </h1>
      <div className='relative flex bottom-7 mb-5'>
        <Image
          src={dimly_lit}
          alt='coverPhoto'
          className='-rotate-12 absolute -left-32 top-3 object-cover h-40 w-40 rounded-xl'
        />
        <Image
          src={close_up}
          alt='coverPhoto'
          className='object-cover absolute h-40 w-40 rounded-xl'
        />
        <Image
          src={food}
          alt='coverPhoto'
          className='object-cover relative left-32 rotate-12 top-3 h-40 w-40 rounded-xl'
        />
      </div>
      <div className='absolute left-0 bottom-3 h-[150px] flex flex-col items-start justify-center w-full px-12'>
        <ul className='space-y-1 w-full px-10 *:bg-gradient-to-br *:from-[#fc5c6c] *:via-[#86f] *:to-[#00c2da] text-white'>
          <li className='rounded-full w-full h-9 bg-slate-300'>
            <div className='gap-x-1 flex items-center justify-between h-full w-full px-1'>
              <p className=' w-8 h-7 rounded-full border text-center'>1</p>
              <Label
                htmlFor='message'
                className='w-full p-1 text-center flex items-center justify-center rounded-full'>
                A photo with a dimly lit face
              </Label>
            </div>
          </li>
          <li className='rounded-full w-full h-9 bg-slate-300'>
            <div className='gap-x-1 flex items-center justify-between h-full w-full px-1'>
              <p className=' w-8 h-7 rounded-full border text-center'>2</p>
              <Label
                htmlFor='message'
                className='w-full p-1 text-center flex items-center justify-center rounded-full'>
                A photo where the face is too large
              </Label>
            </div>
          </li>
          <li className='rounded-full w-full h-9 bg-slate-300'>
            <div className='gap-x-1 flex items-center justify-between h-full w-full px-1'>
              <p className=' w-8 h-7 rounded-full border text-center'>3</p>
              <Label
                htmlFor='message'
                className='w-full p-1 text-center flex items-center justify-center rounded-full'>
                Photos that don&apos;t include the face
              </Label>
            </div>
          </li>
        </ul>
      </div>
    </CardContent>,
    <CardContent className='relative flex flex-col h-full items-center justify-center rounded-xl p-0 overflow-hidden bg-sky-50/50'>
      <h1 className='absolute top-7 text-lg font-bold px-10 py-1 text-center'>
        Full body or profile photos are fine
      </h1>
      <UploadImageDisplay
        imgResources={imagesResult.resources}
        userId={user.id}
        userProfileId={sukiUserProfile?.id!}
      />
      <div className='absolute left-0 bottom-10 h-[100px] w-full px-3'>
        <Label
          htmlFor='message'
          className='w-full space-y-4 flex flex-col items-center justify-center'>
          <h3 className='font-light text-center px-12'>
            In addition to full-body and profile photos, you can also take
            cut-outs of group photos!
          </h3>
          <p className='text-center text-sm'>
            {profilePhotoUrl !== ""
              ? "Thank you for your profile photo"
              : "Let's start setup profile photo"}
          </p>
          <div className='flex items-center justify-between gap-10'>
            <UploadImage
              userId={user.id}
              sukiUserProfileId={sukiUserProfile?.id!}
            />
            {profilePhotoUrl !== "" ? (
              <Button className='font-medium text-sm animate-pulse'>
                <Link
                  href={`${config.nextpublicbaseUrl}/onboarding/self-intro`}>
                  Next Step
                </Link>
              </Button>
            ) : (
              <Button className='font-medium text-sm'>
                <Link
                  href={`${config.nextpublicbaseUrl}/onboarding/self-intro`}>
                  Upload Later
                </Link>
              </Button>
            )}
          </div>
        </Label>
      </div>
    </CardContent>,
  ];

  return (
    <div className='relative bg-sky-100/65 h-screen flex items-center justify-center'>
      <div
        id='photo-album'
        className='absolute w-3/5 flex items-center justify-center py-5 mx-auto'>
        <Carousel className='w-full'>
          <CarouselContent>
            {photoAndInstructionsEleArray.map((item, index) => (
              <CarouselItem
                key={index}
                className='basis-[100%]'>
                <div className='p-1'>
                  <Card className='h-[440px] z-50'>{item}</Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-20 max-sm:hidden w-14 h-14' />
          <CarouselNext className='-right-20 max-sm:hidden w-14 h-14' />
        </Carousel>
      </div>
    </div>
  );
};

export default Photo;
