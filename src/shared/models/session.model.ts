export interface MessageSession {
    id?: number;
    content: string;
    metadata?: string;
    role: string;
    sessionId?: number;
    createdAt?: Date;
}


export interface ChatSession {
    id: number;
    title: string;
    userId: number;
    startedAt: Date;
    messages?: MessageSession[];
}

export interface SessionResponse {
    success: boolean;
    message: {
        content: string[];
        displayable: boolean;
    };
    data: ChatSession | ChatSession[];
}



export interface ChatSessionResponse {
    success: boolean;
    message: {
        content: string[];
        displayable: boolean;
    };
    data: MessageSession;
}