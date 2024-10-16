/** @format */

import { side_bar } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { isValidSukiUser, isValidUser } from "@/lib/error";
import { calculateUserAge } from "@/lib/utils";
import { logo } from "@/public/assets";
import female from "@/public/female.png";
import male from "@/public/male.png";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftDoubleFill } from "react-icons/ri";

async function getSukiUsers({
  mySukiUserProfileId,
}: {
  mySukiUserProfileId: string;
}) {
  const users = await prisma.sukiUserProfile.findMany({
    where: {
      isSetupComplete: true,
      isIdentified: true,
    },
    select: {
      id: true,
      jobCategory: true,
      offDayCategory: true,
      offDayActivity: true,
      bodyHeightCategory: true,
      bodyTypeCategory: true,
      educationCategory: true,
      profilePhotoUrl: true,
      user: {
        select: {
          nickname: true,
          bdday: true,
          bdmonth: true,
          bdyear: true,
          nationality: true,
          gender: true,
        },
      },
    },
  });
  return users;
}
const Pickup = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  isValidUser(user);

  const isSukiUserExit = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  isValidSukiUser(user, isSukiUserExit?.id);

  const sukiUsers = await getSukiUsers({
    mySukiUserProfileId: isSukiUserExit?.id!,
  });

  return (
    <div className='w-full h-full'>
      <div className='px-5 w-full flex items-start justify-between h-full'>
        {/* side-bar component */}
        <div
          id='left-container'
          className='w-4/12 h-full px-10 py-20'>
          <div className='flex flex-col items-start justify-start gap-x-5 gap-y-2 px-3 py-3 h-full w-full'>
            <div className='w-full mb-5'>
              <Link
                href={`${config.nextpublicbaseUrl}`}
                className='flex items-center justify-between px-3 py-2 w-full rounded-xl bg-slate-200 group'>
                <h1 className='text-2xl font-bold'>Suki</h1>
                <Image
                  src={logo}
                  alt='logo'
                  width={120}
                  height={120}
                  className='object-cover h-12 w-12 scale-100 group-hover:scale-110 transition-all delay-100'
                />
              </Link>
            </div>
            {side_bar.map(({ id, title, icon, href }) => (
              <Button
                key={id}
                variant={"ghost"}
                className='w-full flex justify-between bg-white-100/35 group rounded-xl'>
                <Link
                  href={href}
                  className='text-start text-sm font-medium'>
                  {title}
                </Link>
                <Image
                  src={icon}
                  alt='icon'
                  width={32}
                  height={32}
                  className='h-7 w-7 object-cover group:scale-100 group-hover:scale-110 transition-all delay-100'
                />
              </Button>
            ))}
          </div>
        </div>
        <hr className='border-r h-screen' />
        {/* main component */}
        <div
          id='right-container'
          className='relative w-full h-full px-20 py-20 flex items-start'>
          <div
            id='photo-album'
            className='w-full min-h-[480px] px-14'>
            <Carousel className='relative w-2/3 h-full'>
              <CarouselContent>
                {sukiUsers.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-[100%]'>
                    <div className='p-0'>
                      <Card className='relative w-full h-[470px] overflow-hidden'>
                        <Image
                          src={
                            item.profilePhotoUrl
                              ? item.profilePhotoUrl
                              : item.user?.gender === "male"
                              ? male
                              : female
                          }
                          width={320}
                          height={320}
                          alt='profile photo'
                          className='object-cover h-full w-full'
                        />
                        <div className='absolute bottom-4 flex justify-center w-full'>
                          <Link
                            href={`${config.nextpublicbaseUrl}/users/${item.id}`}>
                            <div className=' text-white/85 w-52 py-3 *:hover:cursor-pointer text-center'>
                              <Label htmlFor='nickname'>
                                <h1 className='text-xl font-semibold'>
                                  {item.user?.nickname}
                                </h1>
                              </Label>
                              <div className='w-full flex items-center justify-center space-x-3 text-sm'>
                                <p>{item.user?.nationality}</p>
                                <span>
                                  Age{" "}
                                  {calculateUserAge(
                                    new Date(
                                      item.user?.bdyear!,
                                      item.user?.bdmonth!,
                                      item.user?.bdday!,
                                    ),
                                    new Date(),
                                  )}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <Button
                          variant={"ghost"}
                          className='absolute bottom-6 right-3 border h-10 w-14 text-white/85 rounded-xl'>
                          Like
                        </Button>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='hidden left-3 max-sm:hidden w-14 h-14' />
              <CarouselNext
                className={`relative bottom-12 bg-slate-100 left-3 max-sm:hidden w-14 h-10 rounded-xl hover:bg-slate-100/80 hover:cursor-pointer`}
                asChild>
                <RiArrowLeftDoubleFill className='h-4 w-4' />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
