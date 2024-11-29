import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import Thanks from './slides/Thanks';
import HorizandalSmall from './slides/HorizandalSmall';
import TimerComponent from './components/TimerComponent';

export default function Page() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      
      {/* Intro */}
      <Intro data={data.intro} />
      <SingleList data={data.agenda} />

      {/* Demo  */}
      <HorizandalLarge data={data.whatIsTensorFlow} />
      <HorizandalSmall data={data.whyFaceDetection} />
      <HorizandalLarge data={data.demo} />

      {/* React Tensor */}
      <HorizandalLarge data={data.reactTensor} /> 
      
      {/* Ending */}
      <HorizandalSmall data={data.libraries} />
      <Thanks data={data.thank} />
      <TimerComponent timer={30} />
    </main>
  );
}