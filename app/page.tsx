/** @format */
import Banner from "@/components/Banner";
import CoupleStory from "@/components/CoupleStory";
import Features from "@/components/Features";
import NewCoupleReport from "@/components/NewCoupleReport";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div
      id='home'
      className='w-full mx-auto flex flex-col items-center'>
      <Navbar />
      <Banner />
      <CoupleStory />
      <Features />
      <NewCoupleReport />
    </div>
  );
}
