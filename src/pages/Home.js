import Hero from '../components/Hero/Hero';
import WorksHome from '../components/Works/WorksHome';
import Contact from '../components/Contact/Contact';
import useLocoScroll from '../hooks/useLocoScroll';
import NextWork from '../components/Works/NextWork';

export default function Home() {

  useLocoScroll();

  return (
    <main id="main-container">
      <Hero />
      <WorksHome />
      <Contact />
      <NextWork />
    </main>
  )
}