import Link from "next/link";
import UrlShortner from "./urlshortner/page";

export default function Home() {
  return (
    <main className="text-center">
      <UrlShortner />
    </main>
  );
}
