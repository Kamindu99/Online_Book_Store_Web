export type Users = {
    _id?: string;
    name?: string;
};

export interface UserStateProps {
    usersFdd: Users[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    user: UserStateProps;
}

export interface listParametersType {
    direction?: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
}