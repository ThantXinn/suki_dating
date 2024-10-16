/** @format */

import MultiStepForm from "@/components/MultiStepForm";
import CustomTitle from "@/components/ui/custom-title";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { isValidUser } from "@/lib/error";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Profile = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  isValidUser(user);
  const isSukiUserExit = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: dbUser?.id,
    },
  });
  if (isSukiUserExit) {
    const { profilePhotoUrl } = isSukiUserExit;
    if (profilePhotoUrl !== "") {
      return redirect(`${config.nextpublicbaseUrl}/onboarding/photo`);
    }
  }

  function SkeletonLoading() {
    return (
      <div className='relative h-[730px] w-full flex flex-col gap-5 items-center justify-center px-10'>
        <Skeleton className='relative -top-24 h-40 w-full rounded-sm bg-slate-300/30' />
        <Skeleton className='relative -top-20 h-2 w-full rounded-sm bg-slate-300/30' />
        <div className='relative -top-10 flex flex-wrap items-center justify-center gap-3 px-10'>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              className='h-12 w-32 rounded-full bg-slate-300/30'
            />
          ))}
        </div>
        <Skeleton className='relative bottom-5 h-2 w-full rounded-sm bg-slate-300/30' />
        <Skeleton className='relative -right-80 h-12 w-12 rounded-full bg-slate-300/30' />
      </div>
    );
  }

  return (
    <div className='w-full mx-auto bg-slate-50 rounded-lg'>
      <div className='mt-14'>
        <Suspense
          key={dbUser?.id}
          fallback={<SkeletonLoading />}>
          <div className='pt-20'>
            <CustomTitle
              message={`Hello! ${dbUser?.nickname}`}
              spanmessage='Please tell me a bit more people about who you are.'
              spanclassName='text-base'
            />
          </div>
          <MultiStepForm userId={dbUser?.id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default Profile;
