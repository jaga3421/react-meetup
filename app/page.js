import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import Thanks from './slides/Thanks';
import InteractiveCodeSlide from './slides/InteractiveCodeSlide';
import TimerComponent from './components/TimerComponent';
import RBLogo from './components/RBLogo';
import AnimatedImage from './components/AnimatedImage';

export default function Page() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      <RBLogo />
      
      {/* Intro */}
      <Intro data={data.intro} />
      <SingleList data={data.agenda} />

      {/* What is any? */}
      <HorizandalLarge data={data.whatIsAny} />

      {/* The Problems with any - Interactive Quiz */}
      <InteractiveCodeSlide data={data.problemsWithAny} />

      {/* Where any Creeps In */}
      <HorizandalLarge data={data.whereAnyCreepsIn} />

      {/* Escape Routes: Avoiding any - Interactive Refactoring */}
      <InteractiveCodeSlide data={data.escapeRoutes} />

      {/* TypeScript Compiler Options */}
      <HorizandalLarge data={data.compilerOptions} />

      {/* The Final Boss: never - Interactive Quiz */}
      <InteractiveCodeSlide data={data.finalBossNever} />

      {/* Live-Code Challenge */}
      <InteractiveCodeSlide data={data.liveCodeChallenge} />

      {/* Wrap-up & Key Takeaways */}
      <HorizandalLarge data={data.wrapUp} />

      <Thanks data={data.thank} />
      <TimerComponent timer={30} />

      <AnimatedImage/>
    </main>
  );
}
