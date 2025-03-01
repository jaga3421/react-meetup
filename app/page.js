import data from './data'; 
import Intro from './slides/Intro';
import SingleList from './slides/SingleList';
import HorizandalLarge from './slides/HorizandalLarge';
import Thanks from './slides/Thanks';
import HorizandalSmall from './slides/HorizandalSmall';
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

      {/* What is Cross Functional  */}
      <HorizandalLarge data={data.whatIsCrossFunctionalApp} />
      <HorizandalSmall data={data.whyCrossPlatformApps} />

      {/* Electron, heavy wieight champion */}
      <HorizandalLarge data={data.letsTalkElectron} /> 

      {/* Tauri as Alternative tauriAsAlternative */}
      <HorizandalLarge data={data.tauriAsAlternative} />

      {/*  Webview and Rust */}
      <HorizandalSmall data={data.understandingWebView} />
      <HorizandalLarge data={data.theCatch} />

      <HorizandalSmall data={data.understandingRust} />

      {/* Arc */}

      <HorizandalLarge data={data.arch} />

      {/* API  */}
      <HorizandalLarge data={data.tauriApiBreakdown}/>
      <HorizandalLarge data={data.demo}/>


      <Thanks data={data.thank} />
      <TimerComponent timer={30} />

      <AnimatedImage/>
    </main>
  );
}