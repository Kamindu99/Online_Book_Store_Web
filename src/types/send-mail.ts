export type BooksList = {
    _id: string;
};

export type SendMailDTO = {
    subject?: string;
    message?: string;
    booksList?: BooksList[];
};

export interface SendMailStateProps {
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    sendMail: SendMailStateProps;
}