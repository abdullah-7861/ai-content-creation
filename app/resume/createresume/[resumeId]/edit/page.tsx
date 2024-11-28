"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function EditResume() {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);
  return <div>EditResume</div>;
}

export default EditResume;
