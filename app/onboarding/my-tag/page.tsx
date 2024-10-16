/** @format */

import HobbyIntrestValuesTab from "@/components/HobbyIntrestValuesTab";
import CustomTitle from "@/components/ui/custom-title";
import prisma from "@/lib/db";
import { isValidSukiUser } from "@/lib/error";
import logo from "@/public/logo.svg";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const MyTag = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  const isSukiUserExit = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: dbUser?.id,
    },
  });

  isValidSukiUser(user, isSukiUserExit?.id!);

  return (
    <div className='relative bg-sky-100/65 h-screen flex flex-col items-center justify-center gap-y-2'>
      <div className='w-2/3 h-[580px] rounded-xl bg-white/70 overflow-hidden'>
        <div className='w-full flex items-center justify-center'>
          <Image
            src={logo}
            alt='logo'
            width={120}
            height={120}
            className='object-cover h-20 w-20'
          />
        </div>
        <CustomTitle
          message='Choose at least three things that express who you are'
          className='text-2xl px-7'
          spanmessage='You can change it later'
          spanclassName='text-sm font-light'
        />
        <HobbyIntrestValuesTab sukiUserProfileId={isSukiUserExit?.id!} />
      </div>
    </div>
  );
};

export default MyTag;
