"use client";
import React, { useState } from "react";
import Editor from "@/components/editor/Editor";
import { Button } from "@/components/ui/button";

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};
const Page = () => {
  const [data, setData] = useState(INITIAL_DATA);
  return (
    <div className="h-screen w-1/2 flex flex-col justify-end p-2">
      <div className="editor h-[calc(100svh_-_56px)] justify-end w-full">
        <Editor
          data={data}
          onChange={setData}
          editorblock="editorjs-container"
        />
        <Button
          className="savebtn"
          onClick={() => {
            alert(JSON.stringify(data));
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Page;
