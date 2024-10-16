/** @format */

import { hobbies, intrest, values } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import UserPreferencesBox from "@/components/ui/user-preferences";
import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { isValidSukiUser } from "@/lib/error";
import { calculateUserAge } from "@/lib/utils";
import female from "@/public/female.png";
import male from "@/public/male.png";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const Preview = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const isSukiUserProfileExit = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  isValidSukiUser(user, isSukiUserProfileExit?.id!);

  const userDataDetails = await prisma.sukiUserIntro.findFirst({
    where: {
      userProfileId: isSukiUserProfileExit?.id,
    },
    select: {
      sukiUserProfile: {
        select: {
          jobCategory: true,
          offDayCategory: true,
          offDayActivity: true,
          livingCategory: true,
          bodyHeightCategory: true,
          bodyTypeCategory: true,
          smokingCategory: true,
          personTypeCategory: true,
          incomeCategory: true,
          educationCategory: true,
          profilePhotoUrl: true,
          user: {
            select: {
              nickname: true,
              bdyear: true,
              bdmonth: true,
              bdday: true,
              nationality: true,
              gender: true,
            },
          },
          sukiUserPreferences: {
            select: {
              userHobbies: true,
              userIntrests: true,
              userValues: true,
            },
          },
        },
      },
      title: true,
      content: true,
    },
  });

  //const { sukiUserPreferences } = userDataDetails;
  const userBD = new Date(
    userDataDetails?.sukiUserProfile?.user?.bdyear!,
    userDataDetails?.sukiUserProfile?.user?.bdmonth!,
    userDataDetails?.sukiUserProfile?.user?.bdday!,
  );

  const currentDate = new Date();

  const userAge = calculateUserAge(userBD, currentDate);

  /* user basic info */
  const renderUserBasicInfo = () => {
    const basicInfoTbc = [
      {
        id: 0,
        tbcName: "nickname",
      },
      {
        id: 1,
        tbcName: "age",
      },
      {
        id: 2,
        tbcName: "nationality",
      },
    ];
    const userBasicInfo = [
      {
        id: 0,
        tbcData: userDataDetails?.sukiUserProfile?.user?.nickname,
      },
      {
        id: 1,
        tbcData: userAge,
      },
      {
        id: 2,
        tbcData: userDataDetails?.sukiUserProfile?.user?.nationality,
      },
    ];

    return (
      <>
        <Label htmlFor='title'>
          <h1 className='text-lg font-semibold py-1'>Profile</h1>
          <h1 className='text-lg font-semibold py-1'>Basic Information</h1>
        </Label>
        <div className='flex items-center justify-start py-2 space-x-3 *:text-sm *:leading-7'>
          <div>
            {basicInfoTbc.map((basic_Info_Tbc) => (
              <div key={basic_Info_Tbc.id}>
                <p className='capitalize text-start font-light'>
                  {basic_Info_Tbc.tbcName}
                </p>
              </div>
            ))}
          </div>
          <div>
            {userBasicInfo.map(({ tbcData, id }) => (
              <div key={id}>
                <p className='capitalize text-start font-light'>{tbcData}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  /* user education & occupation info */
  const renderUserEducationAndOccupationInfo = () => {
    const eduOccInfoTbc = [
      {
        id: 0,
        tbcName: "education",
      },
      {
        id: 1,
        tbcName: "job type",
      },
      {
        id: 2,
        tbcName: "annual income",
      },
      {
        id: 3,
        tbcName: "height(cm)",
      },
      {
        id: 4,
        tbcName: "body type",
      },
    ];

    const userEduAndOccupationInfoData = [
      {
        id: 0,
        tbcData: userDataDetails?.sukiUserProfile?.educationCategory,
      },
      {
        id: 1,
        tbcData: userDataDetails?.sukiUserProfile?.jobCategory,
      },
      {
        id: 2,
        tbcData: userDataDetails?.sukiUserProfile?.incomeCategory,
      },
      {
        id: 3,
        tbcData: userDataDetails?.sukiUserProfile?.bodyHeightCategory,
      },
      {
        id: 4,
        tbcData: userDataDetails?.sukiUserProfile?.bodyTypeCategory,
      },
    ];

    return (
      <>
        <Label htmlFor='title'>
          <h1 className='text-lg font-semibold py-1'>
            Education, Occupation and appearance
          </h1>
        </Label>
        <div className='flex items-center justify-start py-2 space-x-3 *:text-sm *:leading-7'>
          <div>
            {eduOccInfoTbc.map((edu_Occ_Info_Tbc) => (
              <div key={edu_Occ_Info_Tbc.id}>
                <p className='capitalize text-start font-light'>
                  {edu_Occ_Info_Tbc.tbcName}
                </p>
              </div>
            ))}
          </div>
          <div>
            {userEduAndOccupationInfoData.map(({ tbcData, id }) => (
              <div key={id}>
                <p className='capitalize text-start font-light'>{tbcData}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  /*  user hobbies and life style info */
  const renderUserPerHobLifeStyleInfo = () => {
    const perHobLifeTbc = [
      {
        id: 0,
        tbcName: "personality/type",
      },
      {
        id: 1,
        tbcName: "roomate",
      },
      {
        id: 2,
        tbcName: "holiday",
      },
      {
        id: 3,
        tbcName: "hobbies",
      },
      {
        id: 4,
        tbcName: "smoking",
      },
    ];
    const userPerHobLifeStyleInfoData = [
      {
        id: 0,
        personalType: [
          {
            userPersonalType:
              userDataDetails?.sukiUserProfile?.personTypeCategory[0],
          },
          {
            userPersonalType:
              userDataDetails?.sukiUserProfile?.personTypeCategory[1],
          },
          {
            userPersonalType:
              userDataDetails?.sukiUserProfile?.personTypeCategory[2],
          },
        ],
      },
      {
        id: 1,
        tbcData: userDataDetails?.sukiUserProfile?.livingCategory,
      },
      {
        id: 2,
        tbcData: userDataDetails?.sukiUserProfile?.offDayCategory,
      },
      {
        id: 3,
        offDayActivity: [
          { activity: userDataDetails?.sukiUserProfile?.offDayActivity[0] },
          { activity: userDataDetails?.sukiUserProfile?.offDayActivity[1] },
        ],
      },
      {
        id: 4,
        tbcData: userDataDetails?.sukiUserProfile?.smokingCategory,
      },
    ];

    return (
      <>
        <Label htmlFor='title'>
          <h1 className='text-lg font-semibold py-1'>
            Personality, Hobbies and Life Style
          </h1>
        </Label>
        <div className='flex items-start justify-start py-2 space-x-3 *:text-sm *:leading-7'>
          <div>
            {perHobLifeTbc.map((per_Hob_Life_Tbc) => (
              <div key={per_Hob_Life_Tbc.id}>
                <p className='capitalize text-start font-light'>
                  {per_Hob_Life_Tbc.tbcName}
                </p>
              </div>
            ))}
          </div>
          <div className='overflow-hidden'>
            {userPerHobLifeStyleInfoData.map(
              ({ tbcData, personalType, offDayActivity, id }) => (
                <div key={id}>
                  <p className='capitalize text-start font-light'>
                    {tbcData}
                    {personalType?.map(({ userPersonalType }, index) => (
                      <span
                        key={index}
                        className='pr-1'>
                        {userPersonalType}
                        {index < personalType.length - 1 && ","}
                      </span>
                    ))}
                    {offDayActivity?.map(({ activity }, index) => (
                      <span
                        key={index}
                        className='pr-1 text-nowrap'>
                        {activity}
                        {index < offDayActivity.length - 1 && ","}
                      </span>
                    ))}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </>
    );
  };
  const UserPreferences =
    userDataDetails?.sukiUserProfile?.sukiUserPreferences.filter(
      (item) => item,
    );
  const [{ userHobbies, userIntrests, userValues }] = UserPreferences!;
  //console.log(userHobbies, userIntrests, userValues);

  const renderUserPreferences = () => {
    return (
      <div className='py-7 px-5 bg-white rounded-xl w-full shadow-xl space-y-7'>
        <Label
          htmlFor='title'
          className='w-full text-center'>
          <h1 className='text-3xl text-transparent gradient-text font-light'>
            My Preferences
          </h1>
        </Label>
        <div className='flex flex-wrap gap-2 items-center justify-center '>
          {userHobbies.map((name: string, index: number) => (
            <div key={index}>
              {hobbies.map(
                ({ id, title, icon }) =>
                  name === title && (
                    <UserPreferencesBox
                      key={id}
                      id={id}
                      title={title}
                      icon={icon}
                      name='userHobbies'
                    />
                  ),
              )}
            </div>
          ))}
          {userIntrests.map((name: string, index: number) => (
            <div key={index}>
              {intrest.map(
                ({ id, title, icon }) =>
                  name === title && (
                    <UserPreferencesBox
                      key={id}
                      id={id}
                      title={title}
                      icon={icon}
                      name='userIntrests'
                    />
                  ),
              )}
            </div>
          ))}
          {userValues.map((name: string, index: number) => (
            <div key={index}>
              {values.map(
                ({ id, title }) =>
                  name === title && (
                    <UserPreferencesBox
                      key={id}
                      id={id}
                      title={title}
                      icon={""}
                      name='userValues'
                    />
                  ),
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='relative mx-auto h-screen lg:min-w-[800px] bg-sky-100/40 overflow-hidden'>
      <Suspense
        key={isSukiUserProfileExit?.id!}
        fallback={<SkeletonLoading />}>
        <div
          id='main-container'
          className='absolute mt-20 flex items-start justify-center px-3 py-10 w-full h-full overflow-scroll scroll-smooth'>
          {/* left container */}
          <div
            id='left-container'
            className='sticky -top-10 flex flex-col gap-y-5 items-start justify-center w-1/2 px-5'>
            <Image
              src={
                userDataDetails?.sukiUserProfile?.profilePhotoUrl
                  ? userDataDetails.sukiUserProfile.profilePhotoUrl
                  : userDataDetails?.sukiUserProfile?.user?.gender === "male"
                  ? male
                  : female
              }
              alt='profile-image'
              width={360}
              height={320}
              className='object-cover rounded-xl h-[380px]'
            />
            <div className='py-3 px-5 bg-white rounded-xl w-full shadow-lg'>
              <Label htmlFor='title'>
                <h1 className='text-xl text-transparent gradient-text font-medium'>
                  {userDataDetails?.sukiUserProfile?.user?.nickname}
                </h1>
              </Label>
              <p className='text-base font-normal'>{userAge} years old</p>
            </div>
            <Button className='w-full shadow-lg rounded-full'>
              <Link
                href={`${config.nextpublicbaseUrl}/pickup/all`}
                className='w-full'>
                Get Started
              </Link>
            </Button>
            <Button
              variant={"link"}
              className='w-full'>
              <Link
                href={`${config.nextpublicbaseUrl}/onboarding/self-intro/setup-my-intro`}>
                Edit my bio
              </Link>
            </Button>
          </div>
          {/* right container */}
          <div
            id='right-container'
            className='flex flex-col items-center justify-center w-1/2 px-5 mb-20 gap-y-5'>
            {renderUserPreferences()}
            <div className='py-3 px-5 bg-white rounded-xl w-full shadow-lg'>
              <Label htmlFor='title'>
                <h1 className='text-xl font-semibold py-2'>Self-Intro</h1>
              </Label>
              <p className='font-light text-pretty'>
                {userDataDetails?.content}
              </p>
            </div>
            <div className='py-3 px-5 bg-white rounded-xl w-full shadow-lg'>
              {/* user basic info */}
              {renderUserBasicInfo()}
              {/* user education & occupation info */}
              {renderUserEducationAndOccupationInfo()}
              {/* user personalities, hobbies and lifestyle info */}
              {renderUserPerHobLifeStyleInfo()}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Preview;

export function SkeletonLoading() {
  return (
    <div className='relative h-[730px] w-full grid grid-cols-2 gap-5 items-center justify-center px-10'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Skeleton className='relative -top-16 h-[380px] w-full rounded-sm bg-slate-300/30' />
        <Skeleton className='relative -top-10 h-20 w-full rounded-full bg-slate-300/30' />
        <Skeleton className='relative -top-8 h-12 w-full bg-slate-300/30' />
      </div>
      <div className='flex flex-col items-center justify-center gap-3'>
        <Skeleton className='relative top-16 h-[380px] w-full rounded-xl bg-slate-300/30' />
        <Skeleton className='relative top-20 h-[380px] w-full rounded-xl bg-slate-300/30' />
      </div>
    </div>
  );
}
