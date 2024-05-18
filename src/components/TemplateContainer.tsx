import React, { Suspense } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "./Container";

type TemplateContainerProps = {
  title: string;
  description: string;
  showBtn: boolean;
  imgDark: string;
  imgLight: string;
  banner: string;
  reverse: boolean;
  btnText?: string;
  btnLink?: string;
};

const TemplateContainer = ({
  title,
  description,
  showBtn,
  imgDark,
  imgLight,
  banner,
  reverse,
  btnText,
  btnLink,
}: TemplateContainerProps) => {
  return (
    <div className={`${banner} h-screen w-full  bg-cover`}>
      <Container>
        <div
          className={`min-h-screen  flex justify-center items-center sm:p-4 lg:px-8 p-1`}
        >
          <div
            className={`flex items-center gap-8  w-11/12 sm:w-full 
        ${
          reverse
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col-reverse md:flex-row"
        } 
       `}
          >
            <div
              className={`flex-1 w-full flex justify-start flex-col mb-10 
          ${reverse ? " fadeRightMini" : " fadeLeftMini"}
          ${reverse ? "text-right" : "text-left"}
        `}
            >
              <h1
                className={` font-bold  text-xl sm:text-4xl  minmd:text-6xl minlg:text-8xl leading-[1.2] minmd:leading-[1.3]`}
              >
                {title}
              </h1>
              <p
                className={`
        
          my-5 minmd:my-10 mb-14  font-light text-xl minmd:text-3xl minlg:text-4xl minmd:leading-16",
          `}
              >
                {description}
              </p>
              {showBtn && (
                <Link href={btnLink || "/signup"}>
                  <Button className={reverse ? "flex-row-reverse" : "flex-row"}>
                    <p>{btnText ? btnText : "Get Started"}</p>
                    <p>
                      {reverse ? (
                        <ArrowLeft className="w-6 h-6 mr-2 animate-pulse" />
                      ) : (
                        <ArrowRight className="w-6 h-6 ml-2 animate-pulse" />
                      )}
                    </p>
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex-1 flex justify-center items-center sm:p-8 px-0">
              <Image
                src={imgDark}
                alt="mockup"
                width={"400"}
                height={"400"}
                className={`
           ${reverse ? " fadeLeftMini" : " fadeRightMini"}
           w-full h-full hidden dark:block minmd:w-11/12 minmd:h-11/12 object-contain`}
              />
              <Image
                src={imgLight}
                alt="mockup"
                width={"400"}
                height={"400"}
                className={`
           ${reverse ? " fadeLeftMini" : " fadeRightMini"}
           w-full dark:hidden h-full minmd:w-11/12 minmd:h-11/12 object-contain`}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TemplateContainer;
