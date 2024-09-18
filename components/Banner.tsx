/** @format */

import coverPhoto from "@/public/coverphoto.jpg";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

const Banner = () => {
  return (
    <div
      id='banner'
      className='w-full max-sm:mt-20'>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={coverPhoto}
          alt='Image'
          width={1220}
          height={780}
          className='object-cover w-full h-full'
        />
      </AspectRatio>
    </div>
  );
};

export default Banner;
