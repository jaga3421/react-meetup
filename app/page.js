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

      {/* The Evolution */}
      <HorizandalLarge data={data.theEvolution} />

      {/* Real-world Use Cases */}
      <HorizandalLarge data={data.realLifeUseCases} />

      {/* How Voice Interfaces Work */}
      <HorizandalLarge data={data.theGeneralIdea} />

      {/* Commands vs Conversation */}
      <HorizandalLarge data={data.commandsVsConversation} />

      {/* Voice Architecture in React */}
      <HorizandalLarge data={data.reactArchitecture} />

      {/* Trigger Commands */}
      <HorizandalLarge data={data.triggerCommands} />

      {/* Example Implementation */}
      <HorizandalLarge data={data.exampleImplementation} />

      {/* Best Practices */}
      <SingleList data={data.bestPractices} />

      {/* Using AI */}
      <HorizandalLarge data={data.usingAI} />

      {/* Full Demo */}
      <HorizandalLarge data={data.fullDemo} />

      {/* Summing Up */}
      <SingleList data={data.summingUp} />

      {/* QA */}
      <SingleList data={data.qa} />

      <Thanks data={data.thank} />
      <TimerComponent timer={25} />


    </main>
  );
}
