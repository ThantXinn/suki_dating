/** @format */

import MultiStepForm from "@/components/MultiStepForm";
import CustomTitle from "@/components/ui/custom-title";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Profile = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return (
    <div className='w-full mx-auto bg-slate-50 rounded-lg'>
      <div className='mt-14'>
        <div className='pt-20'>
          <CustomTitle
            message={`Hello! ${dbUser?.nickname}`}
            spanmessage='Please tell me a bit more people about who you are.'
            spanclassName='text-base'
          />
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
};

export default Profile;
