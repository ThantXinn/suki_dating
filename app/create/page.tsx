/** @format */
import SignUpForm from "@/components/SignUpForm";
import CustomTitle from "@/components/ui/custom-title";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const CreateAccount = async () => {
  const { getUser } = getKindeServerSession();
  const KindeUser = await getUser();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: KindeUser.id,
    },
  });
  //console.log(dbUser);
  return (
    <div className='w-screen mx-auto'>
      <div className='px-32 lg:px-72 w-full h-full'>
        <Label
          htmlFor='title'
          className='mt-5 w-full flex flex-col items-center py-14 space-y-5'>
          <CustomTitle message='Create Suki Account' />
          <span className='text-xs font-light text-center lg:mx-48 mx-14'>
            Looking for a meaningful connection with someone who shares similar
            values and future goals.
          </span>
        </Label>
        {/* sign-up form for create account */}
        <SignUpForm
          userEmail={dbUser?.email}
          userId={dbUser?.id}
        />
      </div>
    </div>
  );
};

export default CreateAccount;
