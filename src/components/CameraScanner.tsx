import { QrReader } from 'react-qr-reader';
import { type FunctionComponent, useState } from 'react';
import { type SetStateAction, type Dispatch } from "react";
import { type IData } from '@/interfaces';

interface CameraScannerProps {
    setOutput: Dispatch<SetStateAction<{ status: string, data: IData } | null>>,
    inputIsCamera: boolean,
    setInputIsCamera: Dispatch<SetStateAction<boolean>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const CameraScanner: FunctionComponent<CameraScannerProps> = ({ setOutput, inputIsCamera, setInputIsCamera, setIsLoading }) => {
    const [cameraIsOpen, setCameraIsOpen] = useState<boolean>(false)

    const handleCamera = () => {
        setCameraIsOpen(!cameraIsOpen)
        return
    }

    const handleScan = async (url: string) => {

        setIsLoading(true)
        setCameraIsOpen(false)

        const response = await fetch((url as string), {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html',
            },
        });

        if (response.ok) {
            const data = await response.text()

            const ticketParser = await fetch('https://ticketscanner.onrender.com/api/v1/tickets/disco', {
                method: 'POST',
                body: JSON.stringify({ ticketData: data }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (ticketParser.ok) {
                const data = await ticketParser.json()
                setIsLoading(false)
                setOutput(data)
            } else {
                console.error(ticketParser.status)
            }

        } else {
            console.error('Form submission failed:', response.status);
        }
    }

    const handleInputType = () => {
        setInputIsCamera(!inputIsCamera)
    }

    return (
        <>

            <div className="flex justify-center mb-6">
                <button
                    className="flex items-center justify-center w-full md:w-1/2 px-4 py-2 border border-blue-500 bg-blue-500 rounded-md text-white hover:bg-white hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white transition-all"
                    onClick={handleCamera}
                >
                    {cameraIsOpen ? "Cerrar Cámara" : "Abrir Cámara"}
                </button>
            </div>

            {cameraIsOpen && (
                <div className="my-2">
                    <QrReader
                        constraints={{ facingMode: 'environment' }}
                        onResult={(result) => {
                            if (!!result) {
                                // @ts-ignore
                                handleScan(result?.text);
                            }
                        }}
                    />
                </div>
            )}

            <button
                type="button"
                onClick={handleInputType}
                className="flex items-center justify-center w-full md:mx-auto md:w-1/2 px-4 py-2 border border-blue-500 bg-blue-500 rounded-md text-white hover:bg-white hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white transition-all"
            >
                Introducir Link
            </button>
        </>
    )
}

export default CameraScanner;