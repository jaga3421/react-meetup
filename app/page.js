import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import Thanks from './slides/Thanks';
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

      {/* Basic TypeScript Operators */}
      <HorizandalLarge data={data.basicOperators} />

      {/* Tricky TypeScript Operators (unknown, never, any) */}
      <HorizandalLarge data={data.trickyOperators} />

      {/* When any is Used */}
      <SingleList data={data.whenAnyIsUsed} />

      {/* Why any Creeps Up */}
      <SingleList data={data.whyAnyCreepsUp} />

      {/* Problems with any */}
      <HorizandalLarge data={data.problemsWithAny} />

      {/* How to Systematically Avoid/Remove any */}
      <HorizandalLarge data={data.howToAvoidAny} />

      {/* Practical Examples */}
      <SingleList data={data.practicalExamples} />

      <Thanks data={data.thank} />
      <TimerComponent timer={30} />

      <AnimatedImage/>
    </main>
  );
}
