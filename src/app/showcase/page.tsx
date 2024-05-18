"use client";
import TemplateContainer from "@/components/TemplateContainer";
import React from "react";

interface Props {}

const LandingPage = (props: Props) => {
  return (
    <>
      <TemplateContainer
        btnText="Get Started"
        btnLink="/signup"
        title="Lazzer - Your Ultimate Compainion"
        description="Take your productivity to the next level with our tools and features. Sign up now to get started."
        showBtn={true}
        imgDark="/hero.png"
        imgLight="/hero-light.png"
        banner="dark:bg-hero  bg-center bg-no-repeat"
        reverse={false}
      />
      <TemplateContainer
        btnText="Get Early Access"
        btnLink="/signup"
        title="Lazzer Flash - WearOS App"
        description="Introducing Indegeneous developed Lazzer Flash, A wearOS app to elevate your productivity and Anxiety (XD)"
        imgDark="/watch-dark.png"
        imgLight="/watch-light.png"
        showBtn={true}
        banner="none"
        reverse={true}
      />
      <TemplateContainer
        title="Desktop App Coming Soon!"
        description="Unleash the full potential of Lazzer with our desktop Version. Stay tuned for more updates. Sign up now to get started."
        imgDark="/lazzer-laptop-dark.png"
        imgLight="/lazzer-laptop-light.png"
        showBtn={false}
        banner="bg-banner4  bg-center bg-cover"
        reverse={false}
      />

      <TemplateContainer
        title="Take Notes, Anywhere, Anytime"
        description=" With Lazzer, you can take notes on the go.learn more about our features and tools."
        imgDark="/pen.png"
        imgLight="/pen-light.png"
        showBtn={false}
        banner="none"
        reverse={false}
      />
      <TemplateContainer
        title="All Your Devices, One Solution"
        description="Access your notes, tasks, and more on all your devices. Sign up now to get started."
        imgDark="/all-device-dark.png"
        imgLight="/all-device-light.png"
        showBtn={false}
        banner="bg-banner4 bg-no-repeat bg-center "
        reverse={true}
      />
      <TemplateContainer
        btnText="Github Repository"
        btnLink="https://github.com/rajeshiitk/lazzer"
        title="Proudly Open Source and trusted by millions"
        description="Lazzer is open source and trusted by millions of users worldwide. Learn more about our story and how we started."
        imgDark="/login-dark.png"
        imgLight="/login-light.png"
        showBtn={true}
        banner="none"
        reverse={false}
      />
    </>
  );
};

export default LandingPage;
