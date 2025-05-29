'use client';
import { InputForEditor } from "@/features/editor/components/InputForEditor";
import { InputIAForEditor } from "@/features/editor/components/InputIAForEditor";
import { TagDropdown } from "@/shared/components/TagDropdown";
import { useFormNotes } from "@/shared/hooks/useFormNotes.hook";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import type { NextPage } from 'next';
import { useState } from "react";
import { Controller } from "react-hook-form";




const Page: NextPage = () => {

    const { control, handleSubmit, fields, onSubmit, inputRefs, register, handleKeyDown, handleNavigateDown, handleNavigateUp, handleSplitLine, title, setTitle, handleActiveIAnote, handleActiveInput } = useFormNotes()

    return (
        <section className=" w-full h-full p-28 relative ">

            <div className="absolute top-20 left-28 flex items-center text-gray-600 gap-2">
                <Spinner className="size-4" color="gray" />
                synchronizing
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col gap-0 w-full h-fit  items-center ">


                    <textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-4xl overflow-hidden h-fit text-gray-800 font-bold w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none"
                        placeholder="Ingresa el título..."
                        rows={1}
                        onInputCapture={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                    />



                    <div className="grid grid-cols-6 gap-2 w-full  text-sm text-gray-700 items-center h-fit pt-5 ">

                        <div className="flex flex-row gap-2 items-center  ">

                            <ListBulletIcon className="size-5 " />

                            <p>Etiquetas:</p>
                        </div>


                        <TagDropdown />


                    </div>

                    <hr className="my-2 w-full  text-gray-300 " />


                    <div className="flex flex-col gap-2 w-full h-full ">



                        {fields.map((input, index) => {

                            if (input.type == 'input') {
                                return (

                                    <Controller
                                        key={input.id}
                                        name={`lines.${index}.content`}
                                        control={control}
                                        defaultValue={input.content || ""}
                                        render={({ field }) => (
                                            <InputForEditor
                                                {...field}
                                                key={input.id}
                                                index={index}
                                                countInputs={fields.length}

                                                inputRef={(el) => (inputRefs.current[index] = el)}

                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onNavigateUp={() => handleNavigateUp(index)}
                                                onNavigateDown={() => handleNavigateDown(index)}
                                                onSplitLine={(textBefore, textAfter) => handleSplitLine(index, textBefore, textAfter)}
                                                handleAutoSubmit={handleSubmit(onSubmit)}
                                                handleActiveIAnote={() => handleActiveIAnote(index)}
                                                handleActiveInput={() => handleActiveInput(index)}
                                            />
                                        )
                                        }
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
            </form>
        </section>
    );
}

export default Page;

