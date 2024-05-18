import Intro from "./slides/Intro";
import Agenda from "./slides/Agenda";
import BeforeWeStart from "./slides/BeforeWeStart";
import Demo from "./slides/Demo";
import Thanks from "./slides/Thanks";
import AnimatedImage from "./components/AnimatedImage";
import TimerComponent from "./components/TimerComponent";
import RBLogo from "./components/RBLogo";
import WhatIsCE from "./slides/WhatIsCE";
import Examples from "./slides/Examples";
import WhyReact from "./slides/WhyReact";
import How2Build from "./slides/How2Build";
import Libraries from "./slides/Libraries";

export default function Home() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      <Intro />
      <Agenda />
      {/* <BeforeWeStart /> */}
      <WhatIsCE />
      <Examples />
      <WhyReact />
      <Demo />
      <How2Build  />
      <Libraries />
      <Thanks />
      <AnimatedImage />
      <TimerComponent timer={30} />
      <RBLogo />
    </main>
  );
}
