import { type SetStateAction, type FunctionComponent, type Dispatch } from "react";

interface VendorSelectorProps {
    selectedVendor: string | null,
    setSelectedVendor: Dispatch<SetStateAction<string | null>>
}

const VendorSelector: FunctionComponent<VendorSelectorProps> = ({ selectedVendor, setSelectedVendor }) => {

    const handleVendorChange = (event: { target: { value: SetStateAction<string | null>; }; }) => {
        setSelectedVendor(event.target.value)
    };

    return (
        <div>
            <h2 className="text-lg mb-2">Selecciona el supermercado</h2>
            <div className="flex justify-between mb-4">
                <label htmlFor="disco" className={`border py-4 px-8 cursor-pointer ${selectedVendor === 'disco' && "border-blue-500 "} transition-all`}>Disco</label>
                <input type="radio" name="vendor" id="disco" value="disco" onChange={handleVendorChange} hidden />

                <label htmlFor="coto" className={`border py-4 px-8 cursor-pointer ${selectedVendor === 'coto' && "border-blue-500"} transition-all`}>Coto</label>
                <input type="radio" name="vendor" id="coto" value="coto" onChange={handleVendorChange} hidden />

                <label htmlFor="jumbo" className={`border py-4 px-8 cursor-pointer ${selectedVendor === 'jumbo' && "border-blue-500"} transition-all`}>Jumbo</label>
                <input type="radio" name="vendor" id="jumbo" value="jumbo" onChange={handleVendorChange} hidden />

                <label htmlFor="dia" className={`border py-4 px-8 cursor-pointer ${selectedVendor === 'dia' && "border-blue-500"} transition-all`}>Día</label>
                <input type="radio" name="vendor" id="dia" value="dia" onChange={handleVendorChange} hidden />
            </div>
        </div>
    )


}

export default VendorSelector;