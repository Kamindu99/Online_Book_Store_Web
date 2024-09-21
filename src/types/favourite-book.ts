import { Books } from "./book-master";

export type Booksfavourite = {
    _id?: string;
    bookId?: string;
    userId?: string;
    createdDate?: string;
    isActive?: boolean;
    bmBook?: Books
};

export type PaginationDTO = {
    page?: number,
    size?: number,
    total?: number,
    totalPages?: number
}

export type BooksfavouriteList = {
    pagination?: PaginationDTO,
    result?: Booksfavourite[];
};

export interface BookStateProps {
    booksfavouriteList: Booksfavourite[] | null;
    booksfavouriteFdd: Booksfavourite[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    bookfavourite: BookStateProps;
}

export interface queryStringParams {
    direction?: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    userId?: string;
}