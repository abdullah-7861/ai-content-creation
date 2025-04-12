import React from "react";
import GenRemove from "./gen-remove";
import BgRemove from "./bg-remove";
import BackgroundReplace from "./bg-replace";
import GenerativeFill from "./generative-fill";
// import ExtractPart from "./extract-parts";
import ExportAsset from "./export-image";

export default function ImageTools() {
  return (
    <>
      <GenRemove />
      <BgRemove />
      <BackgroundReplace />
      <GenerativeFill />
      {/* <ExtractPart /> */}

    </>
  );
}
