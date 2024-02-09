import Intro from "./slides/Intro";
import Agenda from "./slides/Agenda";
import Why from "./slides/Why";
import Principles from "./slides/Principles";
import Implement from "./slides/Implement";

export default function Home() {
  return (
    <main className="dvh z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-[rgb(36,36,36)] text-gray-300">
      <Intro />
      <Agenda />
      <Why />
      <Principles />
      <Implement />
    </main>
  );
}
