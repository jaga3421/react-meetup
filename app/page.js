import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import Thanks from './slides/Thanks';
import HorizandalSmall from './slides/HorizandalSmall';
import DemoLink from './slides/DemoLink';
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

      {/* What is Offline-First  */}
      <HorizandalLarge data={data.whatIsOfflineFirst} />
      <HorizandalSmall data={data.offlineFirstVsPWA} />

      {/* Offline-First Apps in Action */}
      <HorizandalLarge data={data.offlineFirstExamples} /> 

      {/* Demo - App without offline support */}
      <DemoLink data={data.demoWithoutOffline} />

      {/* Core Concepts */}
      <HorizandalLarge data={data.coreConcepts} />

      {/* Technical Stack */}
      <HorizandalLarge data={data.technicalStack} />
      <HorizandalLarge data={data.theCatch} />

      <HorizandalSmall data={data.usefulLibraries} />

      <DemoLink data={data.demoWithOffline}/>


      <Thanks data={data.thank} />
      <TimerComponent timer={30} />

      <AnimatedImage/>
    </main>
  );
}