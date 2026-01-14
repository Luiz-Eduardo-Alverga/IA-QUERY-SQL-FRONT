'use client';

import Header from "./components/Header";
import Body from "./components/Body";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-primary dark:bg-surface-primary overflow-hidden">
      <Header />
      <Body />
    </div>
  );
}
