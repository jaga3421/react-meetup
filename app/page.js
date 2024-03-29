import Intro from "./slides/Intro";
import Agenda from "./slides/Agenda";
import Why from "./slides/Why";
import Principles from "./slides/Principles";
import Implement from "./slides/Implement";
import Libraries from "./slides/Libraries";
import Thanks from "./slides/Thanks";
import AnimatedImage from "./components/AnimatedImage";
import TimerComponent from "./components/TimerComponent";
import RBLogo from "./components/RBLogo";

export default function Home() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      <Intro />
      <Agenda />
      <Why />
      <Principles />
      <Implement />
      <Libraries />
      <Thanks />
      <AnimatedImage />
      <TimerComponent timer={15} />
      <RBLogo />
    </main>
  );
}
