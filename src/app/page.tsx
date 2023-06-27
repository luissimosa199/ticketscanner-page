'use client';

import { useState } from "react";

import CameraScanner from "@/components/CameraScanner";
import Form from "@/components/Form";
import Output from "@/components/Output";

import { type IData } from "@/interfaces";

export default function Home() {

  const [output, setOutput] = useState<{ status: string, data: IData } | null>(null)

  return (
    <main className="bg-gray-100 min-h-screen p-10 flex flex-col items-center justify-center">

      <div className="w-full mx-4 md:w-2/3 md:mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Ticket Scanner</h1>

        <CameraScanner />
        <Form setOutput={setOutput} />

      </div>

      <Output output={output}/>

    </main>
  )
}
