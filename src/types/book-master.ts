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

}

export interface DefaultRootStateProps {
    book: BookStateProps;
}