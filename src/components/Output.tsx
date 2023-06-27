import { type IData } from "@/interfaces";
import Image from "next/image";
import { FunctionComponent } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface OutputProps {
    output: {
        status: string,
        data: IData
    } | null;
}

const Output: FunctionComponent<OutputProps> = ({ output }) => {

    const processedOutput = output?.status ? { ...output, status: undefined } : null;

    const handleCopy = async () => {
        const textToCopy = JSON.stringify(processedOutput, null, 2);

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Copiado exitosamente');
            })
            .catch((error) => {
                alert('Error');
            });
    }

    return (
        <>
            {output &&
                <div className="w-full mx-4 md:w-2/3 md:mx-auto rounded overflow-hidden shadow-lg bg-white my-10 px-6 py-4 flex flex-col items-center text-center">
                    <div className="font-bold text-xl mb-2">Tu compra en {`Disco`}</div>
                    <Image alt={`Disco Logo`} src={output!.data.logoLink} width={250} height={250} />
                    <div className=" ">
                        <p className="text-gray-700 text-base mb-2">Precio total: ${output?.data.totalAmount}</p>
                        <p className="text-gray-700 text-base mb-2">Cantidad de artículos: {output?.data.ticketItems.length}</p>
                    </div>
                </div>}

            {
                output && <div className="w-full min-h-screen md:w-2/3">
                    <SyntaxHighlighter
                        language="javascript"
                        style={twilight}
                        customStyle={{ height: '100vh' }}
                    >
                        {JSON.stringify(processedOutput, null, 2)}
                    </SyntaxHighlighter>
                    <button
                        onClick={handleCopy}
                        type="button"
                        className="w-full md:mx-auto px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white transition-all "
                    >
                        Copiar al portapapeles
                    </button>

                </div>
            }</>
    );
}

export default Output;