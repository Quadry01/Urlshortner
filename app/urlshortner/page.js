"use client";
import React, { useState } from "react";

export default function UrlShortner() {
  const [link, setLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");

  const Shorten = async () => {
    let request = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`
    );
    let response = await request.json();
    let shortened = response.result.full_short_link;
    setShortenedLink(shortened);
  };

  return (
    <div className="text-center py-80 h-full bg-orange-50">
      <input
        onChange={(e) => setLink(e.target.value)}
        className=" border-x-0 rounded bg-gray-300 mr-2 h-10 w-80 sm:mb-6"
        type="text"
      ></input>
      <button
        className=" text-white bg-blue-400 rounded p-3  "
        onClick={Shorten}
      >
        Submit
      </button>
      <p className="mt-4">{shortenedLink}</p>
    </div>
  );
}
