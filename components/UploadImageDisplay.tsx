/** @format */
"use client";
import { config } from "@/lib/config";
import full_body from "@/public/fullbody.jpg";
import { type_serarchResultImages } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Skeleton } from "./ui/skeleton";

const UploadImageDisplay = ({
  imgResources,
  userId,
  userProfileId,
}: {
  imgResources: type_serarchResultImages[];
  userId: string;
  userProfileId: string;
}) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const updateSukiUserProfilePicture = async () => {
    const res = await fetch(`${config.apibaseUrl}/userProfile/${userId}`);
    const { isUserProfileExit } = await res.json();
    const { profilePhotoUrl } = isUserProfileExit;
    //console.log(profilePhotoUrl);
    setImgUrl(profilePhotoUrl);
  };

  useEffect(() => {
    updateSukiUserProfilePicture();
  }, [imgResources]);

  const router = useRouter();
  const handleOnClick = async (public_id: string) => {
    //delet function for cloudinary api
    const res = await fetch(`${config.apibaseUrl}/cloudinary`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        public_id: public_id,
      }),
    });

    //delete function for local db
    await fetch(`${config.apibaseUrl}/userProfile/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sukiUserProfileId: userProfileId,
        secureUrl: "",
      }),
    });
    const { message } = await res.json();
    //console.log(message);

    if (message) {
      setTimeout(() => {
        router.refresh();
      }, 1000);
      setIsLoading(false);
    } else return;
  };

  return (
    <div className='relative bottom-7 object-cover h-44 w-44 rounded-xl'>
      <Image
        key={Math.random()}
        alt='image'
        src={imgUrl !== "" ? imgUrl : full_body}
        width={320}
        height={320}
        className='object-cover h-full w-full rounded-xl'
      />
      <Skeleton
        className={`${
          isLoading
            ? "absolute block -top-1 -left-1 h-[185px] w-[185px] rounded-xl bg-slate-300/45"
            : "hidden"
        } `}
      />
      {imgUrl !== "" && (
        <div
          onClick={() => {
            setIsLoading(true), handleOnClick(imgResources[0].public_id);
          }}
          className='absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center hover:cursor-pointer hover:shadow-lg'>
          <IoMdCloseCircle size={32} />
        </div>
      )}
    </div>
  );
};

export default UploadImageDisplay;
