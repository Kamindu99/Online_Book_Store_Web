export type Books = {
    _id?: string;
    bookCode?: string;
    bookName?: string;
    author?: string;
    category?: string;
    price?: number;
    noOfPages?: number;
    createdDate?: string;
    imageUrl?: string;
    status?: string;
    isActive?: boolean;
};

export type PaginationDTO = {
    page?: number,
    size?: number,
    total?: number,
    totalPages?: number
}

export type BooksList = {
    pagination?: PaginationDTO,
    result?: Books[];
};

export type CategoryDTO = {
    categoryName?: string,
    count?: number
}

export type BooksCount = {
    totalBooks?: number
    category?: CategoryDTO[]
};

export interface BookStateProps {
    booksList: BooksList | null;
    booksFdd: Books[] | null;
    booksCount: BooksCount | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    book: BookStateProps;
}

export interface listParametersType {
    direction?: string;
    page?: number;
    per_page?: number;
    search?: string;
    category?: string;
    sort?: string;
}