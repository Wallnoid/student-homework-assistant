import { useEffect, useState } from "react";
import { ChatSessionResponse, MessageSession } from "../models/session.model";
import { io, Socket } from "socket.io-client";
import { getToken, getUserLocal } from "../utils/localStorage.utils";
import { usePathname, useRouter } from "next/navigation";

import { useLoadChatsStore } from "../store/loadChat.store";


/**
 * Custom hook to manage WebSocket chat functionality.
 * It provides methods to send messages, handle incoming responses, and manage the chat session state.
 *
 * @param {number} id - Optional session ID to connect to a specific chat session
 * @returns {Object} - Contains methods and state variables for managing the chat session
 * * @property {string} message - The latest message received from the server
 * * @property {Function} setMessage - Function to set the latest message
 */
export const useWebSocketChat = (id?: number) => {
    // State variables to manage the chat session
    // The sessionId state holds the ID of the current chat session
    const [sessionId, setSessionId] = useState<number | null>(null);

    // The message state holds the latest message received from the server
    // It is updated whenever a new message is received from the server
    const [message, setMessage] = useState('');

    // The input state holds the user's input message
    // It is used to capture the message that the user wants to send to the server
    const [input, setInput] = useState('');

    // The socket state holds the WebSocket connection instance
    // It is used to send and receive messages from the server
    const [socket, setSocket] = useState<Socket | null>(null);

    // The log state holds the chat session messages
    // It is an array of MessageSession objects that represent the chat history
    const [log, setLog] = useState<MessageSession[]>([]);

    // The animation state indicates whether the chat response is being animated
    // It is set to true when a new message is received from the server and false otherwise
    const [animation, setAnimation] = useState(false);

    // The isLoading state indicates whether the chat session is currently loading
    // It is set to true when a message is being sent and false when the response is
    const [isLoading, setIsLoading] = useState(false);

    // The error state holds any error messages related to the chat session
    // It is set to null initially and can be updated if an error occurs during the chat session
    const [error, setError] = useState<string | null>(null);

    // Using Zustand store to manage the loading state of chats
    // The `useLoadChatsStore` is used to determine if chats should be loaded
    const setLoadChats = useLoadChatsStore((state: any) => state.setLoad);



    const router = useRouter()
    const pathname = usePathname();

    // Effect to initialize the WebSocket connection and set up event listeners
    // This effect runs when the component mounts or when the `id` changes
    useEffect(() => {
        const token = getToken();
        setLog([]);
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

    // Effect to handle incoming chat responses from the server
    // This effect sets up an event listener for the 'chat_response' event
    useEffect(() => {
        if (!socket) return;

        socket.off('chat_response');

        socket.on('chat_response', (data: ChatSessionResponse) => {
            setMessage(data.message.content.join(' '));

            data.data.role = 'assistant';


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


    // Effect to handle the session ID and update the URL path
    // This effect runs when the `sessionId` changes
    useEffect(() => {
        if (!sessionId) return;
        setLoadChats(true);

        const expectedPath = `/chat/${sessionId}`;
        if (pathname !== expectedPath) {
            router.replace(expectedPath);
        }
    }, [sessionId]);


    // Function to handle sending messages to the server
    // This function is called when the user submits a message
    const handleSendMessage = () => {
        if (!input || !socket) return;

        setIsLoading(true);
        const user = getUserLocal();

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
