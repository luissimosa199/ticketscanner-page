import { type SetStateAction, type FormEvent, type Dispatch, type FunctionComponent } from "react";
import { type IData } from "@/interfaces";
import { parseDiscoTicket } from "@/helpers/domscanner";

interface FormProps {
    setOutput: Dispatch<SetStateAction<{ status: string, data: IData } | null>>,
    inputIsCamera: boolean,
    setInputIsCamera: Dispatch<SetStateAction<boolean>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
    selectedVendor: string
}

const Form: FunctionComponent<FormProps> = ({ setOutput, inputIsCamera, setInputIsCamera, setIsLoading, selectedVendor }) => {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const { url } = Object.fromEntries(formData)
        setIsLoading(true)
        const response = await fetch((url as string), {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html',
            },
        });

        if (response.ok) {
            const data = await response.text()

            switch (selectedVendor) {
                case "disco":
                    setOutput({ status: 'OK', data: parseDiscoTicket(data) })
                    break;

                case "coto":
                    console.log(data, "Coto not implemented")
                    // setOutput({ status: 'OK', data: parseDiscoTicket(data) })
                    break;

                    // add more cases

                default:
                    // setOutput({ status: 'ERROR', data: parseDiscoTicket(data) })
                    break;
            }


            setIsLoading(false)
        } else {
            setIsLoading(false)
            console.error('Form submission failed:', response.status);
        }
    };

    const handleInputType = () => {
        setInputIsCamera(!inputIsCamera)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="url" className="text-sm font-medium text-gray-700">
                    Ticket URL
                </label>
                <input
                    type="text"
                    name="url"
                    className="mt-1 h-8 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-blue-500 bg-blue-500 rounded-md text-white hover:bg-white hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white transition-all"
            >
                Enviar Link
            </button>
            <button
                type="button"
                onClick={handleInputType}
                className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:bg-blue-500 focus:text-white transition-all"
            >
                Usar cámara
            </button>
        </form>
    );
}

export default Form;