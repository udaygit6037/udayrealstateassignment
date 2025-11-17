import React from "react";
import Navbar from "./component/Navbar.jsx";
import HeroConsultationSection from "./component/section/HeroConsultationSection.jsx";
import RealtorIntroSection from "./component/section/RealtorIntroSection.jsx";
import WhyChooseUsSection from "./component/section/WhyChooseUsSection.jsx";
import AboutUsSection from "./component/section/AboutUsSection.jsx";
import ProjectsSection from "./component/section/ProjectSection.jsx";
import HappyClientsSection from "./component/section/ClientSection.jsx";
import NewsletterSubscriptionSection from "./component/section/NewsletterSubscriptionSection.jsx";
import Footer from "./component/Footer.jsx";

const App = () => {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />

      <main className="pt-16">

        <HeroConsultationSection />

        <RealtorIntroSection />

        <WhyChooseUsSection />

        <AboutUsSection />

        <ProjectsSection />

        <HappyClientsSection />

        <NewsletterSubscriptionSection />

        <Footer />
      </main>
    </div>
  );
};

export default App;
