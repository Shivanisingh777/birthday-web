import './index.css';
import ProgressBar from './components/ProgressBar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import GrowingTogetherSection from './components/GrowingTogetherSection';
import ChandigarhSection from './components/ChandigarhSection';
import TimelineSection2022 from './components/TimelineSection2022';
import LongDistanceSection from './components/LongDistanceSection';
import BirthdaySection from './components/BirthdaySection';
import Footer from './components/Footer';

const BEGINNING_IMG = 'images/begnning.jpeg';
const DEVELOPER_IMG = 'images/banglore.jpeg';

const HeartPulse = () => (
  <div className="w-full flex items-center justify-center min-h-[300px]">
    <div className="text-center space-y-4">
      <div className="text-[9rem] animate-heartbeat leading-none">❤️</div>
      <p className="text-lg font-semibold" style={{ color: 'var(--accent)' }}>
        Hum sirf ek phase se guzar rahe hain
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen">
      <ProgressBar />

      <HeroSection />

      <StorySection
        year="2017 – The Beginning"
        heading={`"2017… Woh saal jab hum pehli baar mile the."`}
        paragraphs={[
          'Shayad ek normal din tha duniya ke liye…',
          'Par mere liye woh din meri life ka turning point tha.',
          'Tab na future ka idea tha, na long distance ka… Bas ek connection tha jo dheere dheere special ban gaya.',
        ]}
        image={BEGINNING_IMG}
        alt="The beginning of our story 2017"
        grayscale={true}
      />

      <GrowingTogetherSection />
      <ChandigarhSection />
      <TimelineSection2022 />

      <LongDistanceSection />

      <StorySection
        year="Proud of You "
        heading={`"Mujhe tum par hamesha proud feel hota hai."`}
        paragraphs={[
          'Merchant Navy mein reh kar samundar ke beech apni zimmedari nibhana… yeh har kisi ke bas ki baat nahi hoti.',
          'Main Patna mein apni screen ke saamne code likh rahi hoti hoon, aur tum kabhi Netherlands, kabhi Belgium, kabhi China… duniya ke alag alag corners mein safar kar rahe hote ho.',
          'Hum dono apne apne tareeke se strong hain… par tumhari himmat, discipline aur dedication mujhe hamesha inspire karta hai.',
          'Chahe tum kisi port par ho, ya gehre samundar ke beech… Mere liye tum hamesha wahi 2017 wale ho — thode se serious, thode se cute, par poore dil se mere. ❤️',
        ]}
        image={DEVELOPER_IMG}
        alt="Software developer journey"
      />

      <StorySection
        year="Today 🕊️"
        heading={`"Aaj bhi long distance hai… Par ab darr nahi lagta."`}
        paragraphs={[
          'Kyuki mujhe pata hai —',
          'Hum sirf ek phase se guzar rahe hain, kahani khatam nahi ho rahi.',
        ]}
        image={<HeartPulse />}
        reverse
      />

      <BirthdaySection />

      <Footer />
    </div>
  );
}
