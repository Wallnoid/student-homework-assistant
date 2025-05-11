import { useRef, useState } from "react"

type EditorLine = {
    id: number
    value: string
    type: 'input' | 'inputIA'
}


export const useInputForEditor = () => {

    const [inputs, setInputs] = useState<EditorLine[]>([{ id: 1, value: '', type: 'input' }]);
    const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {

        const currentValue = inputs[index].value;
        if (e.key === 'Enter') {
            e.preventDefault();

            const newInput: EditorLine = { id: Date.now(), value: '', type: 'input' };
            const updatedInputs = [...inputs];
            updatedInputs.splice(index + 1, 0, newInput);
            setInputs(updatedInputs);

            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 0);
        }

        if (e.key === 'Backspace' && currentValue === '') {
            e.preventDefault();

            if (inputs.length === 1) return;

            const updatedInputs = [...inputs];
            updatedInputs.splice(index, 1);
            setInputs(updatedInputs);

            setTimeout(() => {
                const focusIndex = index > 0 ? index - 1 : 0;
                inputRefs.current[focusIndex]?.focus();
            }, 0);
        }

        if (e.key === ' ' && currentValue === '') {
            e.preventDefault();

            setInputs((prev) => {
                const updated = [...prev];
                updated[index] = {
                    ...updated[index],
                    type: 'inputIA'
                };
                return updated;
            });

            return;
        }

    };



    return { inputs, setInputs, inputRefs, handleKeyDown }

}