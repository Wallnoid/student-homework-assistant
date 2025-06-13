'use client';
import { CustomIconButton } from "@/shared/components/CustomIconButton";
import { MarkDownConverter } from "@/shared/components/MarkDownConverter";
import { useSession } from "@/shared/hooks/useSession.hook";
import { useWebSocketChat } from "@/shared/hooks/useWebSocketChat.hook";
import { MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Alert, Spinner } from "@material-tailwind/react";
import { use, useEffect, useRef } from "react";


type Params = {
    id: number
}


const Page = ({ params }: { params: Promise<Params> }) => {

    const { id } = use(params)


    const { input, log, message, socket, setLog, handleSendMessage, setMessage, setInput, animation, isLoading, error: errorW, setError } = useWebSocketChat(id);

    const { session, isLoading: isLoadingSession, error } = useSession(id);



    useEffect(() => {
        console.log('ME EJECUTO useSession', session);
        if (!session) return;

        // setLog((prev) => [
        //     ...prev,
        //     `Sesión iniciada: ${session.title} - ${session.startedAt.toLocaleString()}`,
        // ]);

        setLog(() => session.messages ?? []);


    }, [session]);



    if (isLoadingSession) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner className="size-8" color="blue" />
            </div>
        );
    }


    return (

        <section className="flex flex-col h-screen items-center justify-start min-h-screen p-4 bg-gray-100 w-full relative ">

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Chat</h1>
            <div className="h-full overflow-y-auto pb-44 px-20 flex flex-col gap-10 w-full">
                {log.map((entry, index) => {

                    if (entry.role === 'user') {
                        return <div className='w-full flex items-start justify-end' key={index}>
                            <div className='flex items-center w-fit h-fit justify-center gap-2 p-5 bg-gray-300 rounded-lg ' >
                                {entry.content}
                            </div>

                        </div>
                    }


                    return <MarkDownConverter key={index} content={entry.content} animated={index === log.length - 1 && animation} />

                })}




                {
                    isLoading &&
                    <div className='w-full flex items-start justify-start' >
                        <div className='flex items-center w-fit h-fit justify-center gap-2 p-2 bg-gray-50 rounded-lg ' >

                            <div className='loader'></div>


                        </div>

                    </div>
                }


                <Alert open={errorW !== null} onClose={() => setError(null)} color="red">
                    {errorW}
                </Alert>
            </div>




            <div className="w-[85%]  p-6 bg-white rounded-lg shadow-lg absolute bottom-2 left-1/2 transform -translate-x-1/2 mb-4">

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="text-base overflow-hidden h-fit text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none "
                    placeholder="Ingresa tu mensaje..."
                    rows={1}
                    onInputCapture={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                    }}
                />

                <div className='flex items-center justify-end mt-4 gap-5'>


                    <CustomIconButton size='md' variant='text' children={<MicrophoneIcon className="size-5" />} onClick={() => {
                    }} />
                    <CustomIconButton size='md' loading={isLoading} disabled={isLoading} roundedFull variant='filled' children={<PaperAirplaneIcon className="size-5" />} onClick={() => {

                        handleSendMessage();
                    }} />

                </div>

            </div>



        </section>
    );
}

export default Page;

