"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
// import type { ExcalidrawElement } from "@excalidraw/excalidraw/dist/excalidraw/element/types";

// import "@excalidraw/excalidraw/index.css";

const ExcalidrawWrapper: React.FC = () => {
  // console.info(convertToExcalidrawElements([{
  //   type: "rectangle",
  //   id: "rect-1",
  //   width: 186.47265625,
  //   height: 141.9765625,
  // },]));
  return (
    <div className="w-full h-[calc(100svh)] absolute bottom-0 mt-auto sm:h-[calc(100svh_-_56px)]">
      <Excalidraw />
    </div>
  );
};
export default ExcalidrawWrapper;
