import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import HorizandalSmall from './slides/HorizandalSmall';
import LinkSlide from './slides/Link';
import Thanks from './slides/Thanks';
import SlideDotsNav from './components/SlideDotsNav';
import TimerComponent from './components/TimerComponent';
import RBLogo from './components/RBLogo';
import VoiceCelebration from './components/voice-interface/VoiceCelebration';
import VoiceInterface from './components/voice-interface/VoiceInterface';
import VoiceSubtitleBar from './components/voice-interface/VoiceSubtitleBar';

export default function Page() {
  const slideNavItems = [
    { label: 'Intro' },
    { label: 'Agenda' },
    { label: 'CLI -> GUI -> Voice' },
    { label: 'Use Cases' },
    { label: 'How Voice Interfaces Work' },
    { label: 'Voice Architecture in React' },
    { label: 'Implementation' },
    { label: 'Demo' },
    { label: 'Phrase vs Intent' },
    { label: 'Best Practices' },
    { label: 'Summing Up' },
    { label: 'Q&A' },
    { label: 'Thanks' },
  ];

  return (
    <main
      id="deck-root"
      className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300"
    >
      <RBLogo />
      <SlideDotsNav items={slideNavItems} />
      
      {/* Intro */}
      <Intro data={data.intro} />
      <SingleList data={data.agenda} />

      {/* The Evolution */}
      <HorizandalSmall data={data.theEvolution} />

      {/* Real-world Use Cases */}
      <HorizandalLarge data={data.realLifeUseCases} />

      {/* How Voice Interfaces Work */}
      <HorizandalLarge data={data.theGeneralIdea} />

      {/* Voice Architecture in React */}
      <HorizandalLarge data={data.reactArchitecture} />

      {/* Example Implementation */}
      <HorizandalLarge data={data.exampleImplementation} />

      {/* Full Demo */}
      <LinkSlide data={data.fullDemo} />

      {/* Phrase vs Intent */}
      <HorizandalLarge data={data.phraseVsIntent} />

      {/* Best Practices */}
      <SingleList data={data.bestPractices} />

      {/* Summing Up */}
      <SingleList data={data.summingUp} />

      {/* QA */}
      <SingleList data={data.qa} />

      <Thanks data={data.thank} />
      <TimerComponent timer={25} />
      <VoiceSubtitleBar />
      <VoiceCelebration />
      <VoiceInterface />


    </main>
  );
}
