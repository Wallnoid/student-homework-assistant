'use client';
import { InputForEditor } from "@/features/editor/components/InputForEditor";
import { InputIAForEditor } from "@/features/editor/components/InputIAForEditor";
import { LabelsSelect } from "@/features/editor/components/LabelsSelect";
import { useInputForEditor } from "@/features/editor/hooks/useInputForEditor.hook";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import type { NextPage } from 'next';
import { useRef, useState } from "react";




const Page: NextPage = () => {


    const { inputRefs, inputs, handleKeyDown, setInputs } = useInputForEditor()


    const handleChange = (index: number, value: string) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = value;
        setInputs(updatedInputs);
    };


    return (
        <section className=" w-full h-full p-28 ">

            <div className="flex flex-col gap-0 w-full h-fit  items-center ">


                <textarea name="principal-title" id="principal-title"
                    className="text-4xl overflow-hidden h-fit text-gray-800 font-bold w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none "
                    placeholder="Ingresa el título..."
                    rows={1}
                    onInputCapture={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }
                    }

                />


                <div className="grid grid-cols-6 gap-2 w-full  text-sm text-gray-700 items-center h-fit pt-5 ">

                    <div className="flex flex-row gap-2 items-center  ">

                        <ListBulletIcon className="size-5 " />

                        <p>Etiquetas:</p>
                    </div>


                    <LabelsSelect />


                </div>

                <hr className="my-2 w-full  text-gray-300 " />


                <div className="flex flex-col gap-2 w-full h-full ">

                    {inputs.map((input, index) => {

                        if (input.type == 'input') {
                            return (
                                <InputForEditor
                                    key={input.id}
                                    value={input.value}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                    onChange={(val) => handleChange(index, val)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            )
                        }

                        return (

                            <InputIAForEditor
                                key={index} />
                        )
                    }
                    )}



                </div>

            </div>

        </section>
    );
}

export default Page;

