export type Books = {
    bookId?: number;
    bookName?: string;
    author?: string;
    price?: string;
    addedDate?: string;
    statusId?: number;
};

export interface BookStateProps {
    books: Books[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    book: BookStateProps;
}