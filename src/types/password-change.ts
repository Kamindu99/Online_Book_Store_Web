// ==============================|| PW Change Types ||============================== //

export type PwChangePostReq = {
    reqBody?: {
        currentPassword?: string,
        newPassword?: string,
        reNewPassword?: string
    }
    userName?: string
};

export type passwordChangeForms = {
    currentPassword?: string,
    newPassword?: string,
    reNewPassword?: string
};

export type passwordChangeFormList = {
    pagination?: {
        count?: number;
        from?: number;
        to?: number;
        total?: number;
    };
    result?: Array<passwordChangeForms>;
};

export interface PwChangeStateProps {
    passwordChangeForms: passwordChangeFormList | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    pw: PwChangeStateProps;
}

export interface queryParamsProps {
    page: number
    per_page: number
    sort: "userName"
    direction: "asc" | "desc"
    search: string
}