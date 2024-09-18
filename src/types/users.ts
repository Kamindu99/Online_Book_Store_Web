export type Users = {
    _id?: string;
    name?: string;
};

export interface UserGetById {
    _id?: string;
    email?: string;
    isActive?: boolean;
    createdDate?: string;
    firstName?: string;
    lastName?: string;
    occupation?: string;
    profileImage?: string;
};

export interface UserStateProps {
    usersFdd: Users[] | null;
    userGetById: UserGetById | null;
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