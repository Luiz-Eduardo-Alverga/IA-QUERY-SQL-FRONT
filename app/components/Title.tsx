'use client';

import Image from "next/image";

export default function Title() {
  return (
    <section className="text-center space-y-3">
      
      <div className="flex items-center justify-center gap-3 mb-2">
      <Image
        src="/images/iconsoftcom.svg"
        alt="Logo"
        width={50}
        height={50}
      />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Realize sua pergunta</h2>
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-light text-lg">
        Descreva a consulta SQL que você precisa
      </p>
    </section>
  );
}

