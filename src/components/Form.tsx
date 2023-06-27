import { type SetStateAction, type FormEvent, type Dispatch, type FunctionComponent } from "react";
import { type IData } from "@/interfaces";

interface FormProps {
    setOutput: Dispatch<SetStateAction<{ status: string, data: IData } | null>>
}

const Form: FunctionComponent<FormProps> = ({ setOutput }) => {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        // const { url } = Object.fromEntries(formData);

        // const data = await parser(url as string)

        // console.log(data)

        // if (data) {
        //     setOutput(data as unknown as SetStateAction<{ data: IData; } | null>)
        // }


        const json = JSON.stringify(Object.fromEntries(formData));

        const { url } = Object.fromEntries(formData)

        const response = await fetch((url as string), {
            method: 'GET',
            // body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // const data = await response.json();
            const data = await response.text()
            console.log(data)
            // setOutput(data)
            
        } else {
            console.error('Form submission failed:', response.status);
        }


    };

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
                className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Escanear
            </button>
        </form>
    );
}

export default Form;