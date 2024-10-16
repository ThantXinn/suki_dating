/** @format */

import { CreateSukiUserIntro } from "@/app/api/server/action";
import { selfIntro } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/lib/config";
import prisma from "@/lib/db";
import { isValidSukiUser } from "@/lib/error";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const SelfIntro = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const sukiUserProfile = await prisma.sukiUserProfile.findFirst({
    where: {
      userId: user.id,
    },
  });

  const userNickName = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      nickname: true,
    },
  });

  const isSukiUserIntroExit = await prisma.sukiUserIntro.findFirst({
    where: {
      userProfileId: sukiUserProfile?.id,
    },
  });

  isValidSukiUser(user, sukiUserProfile?.id!);

  if (isSukiUserIntroExit)
    return redirect(`${config.nextpublicbaseUrl}/onboarding/my-tag`);

  const renderTextWithStyledNickname = (content: string) => {
    const nickname = content
      .replace("[Nick Name]", userNickName?.nickname!)
      .match(userNickName?.nickname!);
    const regex = /\[.*?\]/; // Regular expression to match text within square brackets
    const parts = content.split(regex); // Split text into parts around the nickname

    return (
      <>
        <Input
          type='hidden'
          name='content'
          value={nickname?.input}
        />
        <p className='font-light text-base text-pretty'>
          {parts[0]} {/* Text before nickname */}
          {nickname && (
            <span className='font-medium text-lg text-pretty text-transparent gradient-text capitalize'>
              {nickname}
            </span>
          )}
          {parts[1]} {/* Text after nickname */}
        </p>
      </>
    );
  };

  return (
    <div className='relative bg-sky-100/40 bg-opacity-25 h-screen flex items-center justify-center'>
      <div
        id='photo-album'
        className='absolute w-2/3 flex flex-col gap-y-5 items-center justify-center py-5 mx-auto'>
        <Carousel className='w-full'>
          <CarouselContent>
            {selfIntro.map(({ id, title, content }) => (
              <CarouselItem
                key={id}
                className='basis-[100%]'>
                <div className='p-1'>
                  <Card className='h-[440px] z-50'>
                    <CardContent className='relative flex flex-col h-full items-center justify-center rounded-xl p-0 overflow-hidden bg-sky-50/10'>
                      <form
                        action={CreateSukiUserIntro}
                        className='flex flex-col items-center justify-center'>
                        <Input
                          type='hidden'
                          name='userProfileId'
                          value={sukiUserProfile?.id!}
                        />
                        <Input
                          type='hidden'
                          name='title'
                          value={title}
                        />
                        <h1
                          id='title'
                          className='absolute top-12 text-transparent gradient-text text-xl font-bold px-10 py-1 text-center'>
                          {title}
                        </h1>
                        <div className='relative top-7 w-full px-3 py-3'>
                          <Label
                            id='content'
                            htmlFor='message'
                            className='w-full px-12 flex flex-col items-center justify-center'>
                            {renderTextWithStyledNickname(content)}
                          </Label>
                        </div>
                        <Button
                          type='submit'
                          className='relative top-7'>
                          Use this intro
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-20 max-sm:hidden w-14 h-14' />
          <CarouselNext className='-right-20 max-sm:hidden w-14 h-14' />
        </Carousel>
        <Button>
          <Link
            href={`${config.nextpublicbaseUrl}/onboarding/self-intro/setup-my-intro`}>
            Let&apos;s start introduce by my self
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SelfIntro;

/*
<Link
                            href={`${config.nextpublicbaseUrl}/onboarding/preview`}>
                            Use this intro
                          </Link>
*/
