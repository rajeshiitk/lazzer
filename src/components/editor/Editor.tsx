"use client";
import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";

type EditorProps = {
  data: any;
  onChange: (data: any) => void;
  editorblock: string;
  resetTrigger?: boolean;
};

const Editor = ({ data, onChange, editorblock, resetTrigger }: EditorProps) => {
  console.log(data);
  const ref = useRef<EditorJS>();
  useEffect(() => {
    //Initialize editorjs if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorblock,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(() => data);
        },
      });
      ref.current = editor;
    }

    //Add a return function to handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = undefined;
      }
    };
  }, [editorblock]);

  useEffect(() => {
    if (ref.current?.render) {
      ref.current.render(data);
    }
  }, [resetTrigger]);

  return <div className="w-full h-full" id={editorblock} />;
};

export default memo(Editor);
