import {useState} from "react";
import {TiTick} from "react-icons/ti";

export default function Steps({currentStep}) {
    const steps = ["Login", "Info. Pessoais", "Endereço"];
    const [complete, setComplete] = useState(false);
    return (
        <>
            <div className="flex  justify-between text-white w-full md:w-5/12">
                {steps?.map((step, i) =>
                    <div key={i} className={`step-item ${currentStep=== i && "active"} ${ i  < currentStep && 'complete'} `}>
                        <div className="step">{i < currentStep ? <TiTick size={24}/> : i+1}</div>
                        <p>{step}</p>
                    </div>
                )}

            </div>
        </>

    )
}