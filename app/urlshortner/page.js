"use client";
import React, { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Open_Sans } from "next/font/google";
const opensans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"] });
export default function UrlShortner() {
  const [link, setLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [theme, setTheme] = useState(<BsMoon />);
  const [background, setBackground] = useState("bg-orange-50");
  const [theColor, setThecolor] = useState("i");

  const Shorten = async () => {
    let request = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`
    );
    let response = await request.json();
    let shortened = response.result.full_short_link;
    setShortenedLink(shortened);
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

  return (
    <div style={opensans.style} className={`pt-40 pb-96 ${background}`}>
      <div className="w-8/12  m-auto">
        <button
          onClick={DarkTheme}
          className="  absolute right-28 top-20 text-4xl"
        >
          {theme}
        </button>
        <h1 className={`text-4xl font-bold mb-2 ${theColor}`}>
          Simplify links with our URL shortener
        </h1>
        <h5 className={`text-lg ${theColor}`}>
          condense lengthy URLs into concise, shareable links for effortless
          navigation.
        </h5>
      </div>
      <div className="mt-16">
        <input
          onChange={(e) => setLink(e.target.value)}
          className=" border-slate-600 border-2 rounded bg-gray-50 mr-2 h-10 w-80 sm:mb-6"
          type="text"
        ></input>
        <button
          className=" text-white bg-blue-400 rounded p-3  "
          onClick={Shorten}
        >
          Submit
        </button>{" "}
        <br />
        <p className="mt-4 ">{shortenedLink}</p>
      </div>
    </div>
  );
}
