/** @format */
"use client";

import { config } from "@/lib/config";
import { Loader2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const UploadImage = ({
  userId,
  sukiUserProfileId,
}: {
  userId: string;
  sukiUserProfileId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOnClickUpload = async (secureUrl: string) => {
    //console.log(secureUrl);
    const res = await fetch(`${config.apibaseUrl}/userProfile/${userId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sukiUserProfileId: sukiUserProfileId,
        secureUrl: secureUrl,
      }),
    });
    setIsLoading(true);
    const { updateSukiUserProfile } = await res.json();
    const { profilePhotoUrl } = updateSukiUserProfile;
    if (profilePhotoUrl !== "") {
      setTimeout(() => {
        router.refresh();
        setIsLoading(false);
      }, 1000);
    }
  };
  return (
    <div className=' max-sm:flex max-sm:h-48'>
      <CldUploadWidget
        uploadPreset='xoqxzigh'
        options={{ maxFiles: 1 }}
        onSuccess={(result, { widget }) => {
          console.log(result);
          const success = result.event;
          const { secure_url }: any = result.info;
          if (success === "success") {
            handleOnClickUpload(secure_url);
          }
          widget.close();
        }}>
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return isLoading ? (
            <Button className='font-medium text-sm'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please Wait
            </Button>
          ) : (
            <Button
              className='font-medium text-sm'
              onClick={() => {
                handleOnClick();
              }}>
              Select Photo
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;

/*
setTimeout(() => {
              router.refresh();
            }, 1000);
*/
