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