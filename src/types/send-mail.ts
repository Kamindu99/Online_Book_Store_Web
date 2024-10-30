export type SendMailDTO = {
    subject?: string;
    message?: string;
};

export interface SendMailStateProps {
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    sendMail: SendMailStateProps;
}