/** @format */
"use client";
import logo from "@/public/logo.svg";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { navMenus } from "../app/constants";

const Navbar = () => {
  return (
    <div
      id='nav-bar'
      className='max-sm:fixed sticky top-0 z-10 bg-white flex justify-between items-center w-full h-20 px-14 py-3'>
      <div
        id='left-section'
        className='flex items-center'>
        <Image
          src={logo}
          alt='logo'
          width={120}
          height={120}
          className='object-cover h-16 w-16'
        />
        <h1 className='text-2xl font-bold'>Suki</h1>
      </div>
      <div
        id='left-section'
        className='flex flex-wrap items-center justify-between w-1/2'>
        {navMenus.map(({ id, title, url }) => (
          <Link
            key={id}
            href={url}>
            {title}
          </Link>
        ))}
        <RegisterLink className='py-1.5 border flex justify-center rounded-full bg-primary w-24 text-white'>
          Login
        </RegisterLink>
      </div>
    </div>
  );
};

export default Navbar;
