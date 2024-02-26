import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <div className="w-full pb-8 text-center">
         <a 
         className="text-1xl text-white cursor-pointer underline hover:text-indigo-400"
         href="https://interviewpro.info/"
         target="_blank"
         >
            Powered by InterviewPro Info Team</a>
      </div>
    </div>
   );
}
 
export default LandingPage;
