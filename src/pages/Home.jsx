import React from "react";
import Hero from "../components/HomePage/Hero";
import NovixScientificCredibilitySection from "../components/HomePage/NovixScientificCredibilitySection";
import NovixTherapeuticUniverse from "../components/HomePage/NovixTherapeuticUniverse";
import NovixScienceJourney from "../components/HomePage/NovixScienceJourney";
import StorySection from "../components/StorySection/StorySection";
import NovixCardStackAnimation from "../components/NovixCardStackAnimation/NovixCardStackAnimation";
import NovixCertificationsSection from "../components/HomePage/NovixCertificationsSection";
import NovixContactCTA from "../components/HomePage/NovixContactCTA";
import StatsCard from "../components/HomePage/Statscard";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <StatsCard/>
      <StorySection />
      <NovixCardStackAnimation />
      <NovixCertificationsSection />
      <NovixContactCTA />
    </div>
  );
};

export default Home;
