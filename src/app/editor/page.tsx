"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useMediaQuery } from "@/hooks/use-media-query";
const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const ExcalidrawWrapper = dynamic(
  async () => await import("@/components/ExcalidrawWrapper"),
  {
    ssr: false,
  }
);

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Welcome to Lazzer!",
        level: 1,
      },
    },
  ],
};
const Page = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [data, setData] = useState(INITIAL_DATA);
  const [resetTrigger, setResetTrigger] = useState(false);
  return (
    <div className="">
      <ResizablePanelGroup
        direction={isDesktop ? "horizontal" : "vertical"}
        className="min-h-[calc(100svh)] w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={30} minSize={25}>
          <div className="h-[calc(100svh)]  w-full overflow-auto  flex flex-col justify-end p-4">
            <div className="editor h-[calc(100svh_-_56px)] relative gap-2 py-6 sm:px-6  justify-end w-full">
              <div className="flex gap-8 z-10 top-0 left-0 justify-evenly">
                <Button
                  variant="secondary"
                  className="px-4 savebtn w-full"
                  onClick={() => {
                    alert(JSON.stringify(data));
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="destructive"
                  className="px-4 savebtn w-full"
                  onClick={() => {
                    const newData = {
                      ...INITIAL_DATA,
                      time: new Date().getTime(),
                    };
                    setData(newData);
                    setResetTrigger(!resetTrigger);
                  }}
                >
                  Reset
                </Button>
              </div>

              <Editor
                data={data}
                onChange={setData}
                editorblock="editorjs-container"
                resetTrigger={resetTrigger}
              />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={60} defaultSize={70}>
          <div className="h-full relative   ">
            <ExcalidrawWrapper />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Page;
