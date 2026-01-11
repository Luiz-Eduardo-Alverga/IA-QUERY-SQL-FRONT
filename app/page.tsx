'use client';

import Header from "./components/Header";
import Body from "./components/Body";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] dark:bg-[#0F172A] overflow-hidden">
      <Header />
      <Body />
    </div>
  );
}
