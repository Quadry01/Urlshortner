"use client";
import React, { useState } from "react";
import { BsMoon, BsSun, BsClipboard, BsClipboard2Check } from "react-icons/bs";
import { Open_Sans } from "next/font/google";
const opensans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
export default function UrlShortner() {
  const [link, setLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [theme, setTheme] = useState(<BsMoon />);
  const [background, setBackground] = useState("bg-orange-50");
  const [theColor, setThecolor] = useState("i");
  const [clipIcon, setClipIcon] = useState(
    <BsClipboard className="text-2xl" />
  );
  const [clipIconvisible, setClipIconvisible] = useState("hidden");

  const Shorten = async () => {
    let request = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`
    );
    let response = await request.json();
    let shortened = response.result.full_short_link;
    setShortenedLink(shortened);
    setClipIconvisible("");
  };
  const DarkTheme = (e) => {
    if (background === "bg-orange-50") {
      setBackground("bg-slate-800");
      setTheme(<BsSun className="text-white" />);
      setThecolor("text-white");
    } else {
      setBackground("bg-orange-50");
      setTheme(<BsMoon />);
      setThecolor("t");
    }
    e.preventDefault();
  };
  const CopyHandler = () => {
    setClipIcon(<BsClipboard2Check className="text-2xl" />);
    navigator.clipboard.writeText(shortenedLink);
  };

  return (
    <div style={opensans.style} className={`pt-40 pb-96 px-10 ${background}`}>
      <div className="lg:w-8/12 sm:w-96  m-auto">
        <button
          onClick={DarkTheme}
          className="  absolute lg:right-28 sm:right-28  top-20 lg:text-4xl sm:text-3xl"
        >
          {theme}
        </button>
        <h1
          className={`text-4xl  font-bold sm:font-semibold mb-2  ${theColor} `}
        >
          Simplify links with our URL shortener
        </h1>
        <h5 className={`lg:text-lg sm:text-sm ${theColor}`}>
          condense lengthy URLs into concise, shareable links for effortless
          navigation.
        </h5>
      </div>
      <div className="mt-16">
        <input
          onChange={(e) => setLink(e.target.value)}
          className=" p-2 border-slate-600 border-2 rounded bg-gray-50 mr-2 h-10 w-80 sm:mb-6"
          type="text"
        ></input>
        <button
          className=" text-white bg-blue-400 rounded p-3 mt-4 "
          onClick={Shorten}
        >
          Submit
        </button>{" "}
        <br />
        <p className={`mt-4 ${theColor} `}>
          {shortenedLink}{" "}
          <button
            className={`text-lg p-2 border-2 rounded ml-4 ${clipIconvisible}`}
            onClick={CopyHandler}
          >
            {clipIcon}
          </button>
        </p>
      </div>
    </div>
  );
}
