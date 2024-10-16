/** @format */
"use server";
import SetupMyIntroForm from "@/components/SetupMyIntroForm";
import prisma from "@/lib/db";
import { isValidSukiUser } from "@/lib/error";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type INITIAL_DATATYPE = {
  title: string | null;
  content: string | null;
};
const INITIAL_DATA: INITIAL_DATATYPE = {
  title: "Setup your own Intro title",
  content:
    "Welcome! Personalize your introduction to make a stronger first impression and improve your connections.",
};
const SetupMyIntro = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const sukiUserProfile = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: user.id,
    },
  });
  isValidSukiUser(user, sukiUserProfile?.id!);

  const sukiUserIntro = await prisma.sukiUserIntro.findFirst({
    where: {
      userProfileId: sukiUserProfile?.id,
    },
    select: {
      title: true,
      content: true,
    },
  });

  const { title, content }: INITIAL_DATATYPE = sukiUserIntro
    ? sukiUserIntro
    : INITIAL_DATA;

  return (
    <div className='relative mx-auto h-screen bg-sky-100/40 w-full'>
      <div className='py-10 px-10'>
        <SetupMyIntroForm
          title={title!}
          content={content!}
          sukiUserProfileId={sukiUserProfile!.id}
        />
      </div>
    </div>
  );
};

export default SetupMyIntro;
