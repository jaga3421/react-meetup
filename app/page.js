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

      {/* Introduction - About useEffect */}
      <HorizandalLarge data={data.introAboutUseEffect} />

      {/* Introduction - Why This Talk */}
      <HorizandalLarge data={data.whyThisTalk} />

      {/* Why useEffect Feels Necessary */}
      <HorizandalLarge data={data.whyUseEffectFeelsNecessary} />

      {/* React Mental Model - Render → Commit */}
      <HorizandalLarge data={data.reactMentalModel} />

      {/* React Mental Model Examples */}
      <HorizandalLarge data={data.reactMentalModelExamples} />

      {/* React 19: New Tools, Same Principles */}
      <HorizandalLarge data={data.react19Features} />

      {/* Summing Up */}
      <SingleList data={data.summingUp} />

      {/* Pop Quiz */}
      <SingleList data={data.quiz} />

      <Thanks data={data.thank} />
      <TimerComponent timer={25} />


    </main>
  );
}
