import { useEffect, useState } from "react";
import { ChatSessionResponse, MessageSession } from "../models/session.model";
import { io, Socket } from "socket.io-client";
import { getToken, getUser } from "../utils/localStorage.utils";
import { usePathname, useRouter } from "next/navigation";
import { set } from "react-hook-form";
import { use } from "chai";


export const useWebSocketChat = (id?: number) => {
    const [sessionId, setSessionId] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [log, setLog] = useState<MessageSession[]>([]);
    const [animation, setAnimation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()
    const pathname = usePathname();

    useEffect(() => {
        const token = getToken();
        setLog([]); // Limpiar el log al iniciar el hook
        console.log('ME EJECITO useWebSocketChat');
        if (id) {
            id = parseInt(id.toString());
            if (!isNaN(id)) {
                setSessionId(id);
            }
        }

        if (!token) return;

        const socketIo = io('http://localhost:3010', {
            query: { token },
            transports: ['websocket'],
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.off('chat_response');

        socket.on('chat_response', (data: ChatSessionResponse) => {
            console.log('📩 Respuesta del servidor:', data);
            setMessage(data.message.content.join(' '));

            data.data.role = 'assistant'; // Asegurarse de que el rol sea 'assistant'

            setAnimation(true);

            setIsLoading(false);

            setLog((prev) => [...prev, data.data]);

            if (sessionId) return;
            setSessionId(data.data.sessionId!);
        });

        // Manejo de errores
        socket.on('chat_error', (err: Error) => {
            console.error('Error de conexión:', err);
            setError(err.message);
            setIsLoading(false);
        });



    }, [socket]);


    useEffect(() => {
        if (!sessionId) return;

        const expectedPath = `/chat/${sessionId}`;
        if (pathname !== expectedPath) {
            router.replace(expectedPath);
        }
    }, [sessionId]);



    const handleSendMessage = () => {
        if (!input || !socket) return;

        setIsLoading(true);
        const user = getUser();

        const payload = {
            event: 'chat_message',
            data: {
                userId: user?.id,
                prompt: input,
                sessionId: sessionId
            },
        };

        const newMessage: MessageSession = {
            content: input,
            role: 'user',
        };

        setLog((prev) => [...prev, newMessage]);

        socket.emit('chat_message', payload.data);
        console.log('📤 Enviando mensaje:', payload.data);

        setInput('');

    };


    return {
        message,
        setMessage,
        input,
        setInput,
        socket,
        log,
        setLog,
        handleSendMessage,
        animation,
        isLoading,
        setError,
        error,
    }
}
