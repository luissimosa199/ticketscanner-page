import { QrReader } from 'react-qr-reader';
import { type FunctionComponent, useState } from 'react';
import { type SetStateAction, type Dispatch } from "react";
import { type IData } from '@/interfaces';

interface CameraScannerProps {
    setOutput: Dispatch<SetStateAction<{ status: string, data: IData } | null>>
}

const CameraScanner: FunctionComponent<CameraScannerProps> = ({ setOutput }) => {

    const handleCamera = () => {
        setCameraIsOpen(!cameraIsOpen)
        return
    }

    const handleScan = async (url: string) => {

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
                setOutput(data)
                setCameraIsOpen(false)
            } else {
                console.error(ticketParser.status)
            }

        } else {
            console.error('Form submission failed:', response.status);
        }
    }

    const [cameraIsOpen, setCameraIsOpen] = useState<boolean>(false)

    return (
        <>

            <div className="flex justify-center mb-6">
                <button
                    className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white transition-all"
                    onClick={handleCamera}
                >
                    {cameraIsOpen ? "Cerrar Cámara" : "Abrir Cámara"}
                </button>
            </div>

            {cameraIsOpen && (
                <QrReader
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result) => {
                        if (!!result) {
                            // @ts-ignore
                            handleScan(result?.text);
                        }
                    }}
                />
            )}
        </>
    )
}

export default CameraScanner;