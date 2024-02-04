"use client"

import { useEffect } from "react";
import { preventScroll, allowScroll } from "@/utils/scroll";

const usePreventScroll = () => {
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);
};

export default usePreventScroll;