'use client';

import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import CameraScanner from "@/components/CameraScanner";
import Form from "@/components/Form";
import Output from "@/components/Output";
import { type IData } from "@/interfaces";
import VendorSelector from "@/components/VendorSelector";

export default function Home() {

  const [output, setOutput] = useState<{ status: string, data: IData } | null>(null)
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [inputIsCamera, setInputIsCamera] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  return (
    <main className="bg-gray-100 min-h-screen p-10 flex flex-col items-center justify-center">

      <div className="w-full mx-4 md:w-2/3 md:mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Ticket Scanner</h1>

        <VendorSelector setSelectedVendor={setSelectedVendor} selectedVendor={selectedVendor} />

        {selectedVendor && <div>
          <h2 className="text-lg mb-4">
            Usa la cámara o introduce el link de tu ticket
          </h2>
          {inputIsCamera
            ?
            <CameraScanner
              inputIsCamera={inputIsCamera}
              setInputIsCamera={setInputIsCamera}
              setOutput={setOutput}
              setIsLoading={setIsLoading}
            />
            :
            <Form
              inputIsCamera={inputIsCamera}
              setInputIsCamera={setInputIsCamera}
              setOutput={setOutput}
              setIsLoading={setIsLoading}
              selectedVendor={selectedVendor}
            />
          }
        </div>}

      </div>

      {isLoading && <div className="mt-12"> <CircularProgress /> </div>}

      <Output output={output} />

    </main>
  )
}
