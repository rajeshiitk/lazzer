"use client";

import React from "react";
import { Rings } from "react-loader-spinner";

function loading() {
  return (
    <div className="grid place-items-center h-full w-full">
      <Rings
        height="180"
        width="180"
        color="#6b7280"
        radius="8"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
}

export default loading;
