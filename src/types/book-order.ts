import { Books } from "./book-master";
import { UserGetById } from "./users";

export type Booksorder = {
    _id?: string;
    bookId?: string;
    userId?: string;
    createdDate?: string;
    comment?: string;
    approverComment?: string
    status?: string;
    approvedDate?: string;
    bmBook?: Books;
    umUser?: UserGetById;
    isActive?: boolean;
};

export type PaginationDTO = {
    page?: number,
    size?: number,
    total?: number,
    totalPages?: number
}

export type BooksorderList = {
    pagination?: PaginationDTO,
    result?: Booksorder[];
};

export interface BookStateProps {
    booksorderList: BooksorderList | null;
    booksorderFdd: Booksorder[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    bookorder: BookStateProps;
}

export interface queryStringParams {
    direction?: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
    userId?: string;
    isActive?: boolean;
}