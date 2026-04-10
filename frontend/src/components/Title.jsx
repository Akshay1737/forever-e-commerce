import React from "react";
import { motion as Motion } from "framer-motion";

const Title = ({ text1, text2, variant = "default" }) => {
  const text = (
    <Motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-gray-500 text-sm sm:text-base tracking-wide"
    >
      {text1}{" "}
      <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
        {text2}
      </span>
    </Motion.p>
  );

  switch (variant) {
    case "glow":
      return (
        <div className="flex items-center gap-3 mb-3 group">
          {text}
          <Motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            whileHover={{ scaleX: 1.2 }}
            className="w-14 h-0.75 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          />
        </div>
      );

    case "underline":
      return (
        <div className="mb-3 group">
          {text}
          <Motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            whileHover={{ width: "80%" }}
            className="h-0.75 bg-linear-to-r from-blue-500 to-cyan-400 mt-1 rounded-full"
          />
        </div>
      );

    case "icon":
      return (
        <div className="flex items-center gap-2 mb-3 group">
          <Motion.span
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            whileHover={{ rotate: 20, scale: 1.2 }}
            className="text-pink-500 text-lg"
          >
            ✦
          </Motion.span>
          {text}
          <Motion.div className="w-8 h-0.75 bg-pink-500 rounded-full" />
        </div>
      );

    case "centered":
      return (
        <div className="flex flex-col items-center mb-4">
          {text}
          <Motion.div
            initial={{ width: 0 }}
            animate={{ width: "30%" }}
            className="h-0.75 bg-linear-to-r from-emerald-400 to-teal-500 mt-2 rounded-full"
          />
        </div>
      );

    case "badge":
      return (
        <div className="mb-3">
          <span className="px-3 py-1 text-xs bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full mr-2">
            NEW
          </span>
          {text}
        </div>
      );

    case "boxed":
      return (
        <div className="inline-block border border-gray-300 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition mb-3">
          {text}
        </div>
      );

    case "gradient-line":
      return (
        <div className="mb-3">
          {text}
          <div className="h-0.75 w-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 mt-1 rounded-full animate-pulse"></div>
        </div>
      );

    case "split":
      return (
        <div className="flex items-center justify-between mb-3">
          {text}
          <div className="flex-1 mx-3 h-0.5 bg-gray-300"></div>
          <span className="text-xs text-gray-400">Section</span>
        </div>
      );

    case "neon":
      return (
        <div className="mb-3">
          <p className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 font-bold text-lg drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]">
            {text1} {text2}
          </p>
        </div>
      );

    default:
      return (
        <div className="inline-flex gap-2 items-center mb-3 group">
          {text}
          <Motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            whileHover={{ width: "5rem" }}
            className="h-0.75 bg-linear-to-r from-gray-700 to-gray-900 rounded-full"
          />
        </div>
      );
  }
};

export default Title;