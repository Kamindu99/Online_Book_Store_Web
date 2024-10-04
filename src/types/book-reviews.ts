export type BookReviewsDTO = {
    _id?: string;
    bookId?: string;
    userId?: string;
    comment?: string;
    createdDate?: string;
    umUser?: {
        id?: string;
        name?: string;
        profileImage?: string;
    }
    isActive?: boolean;
};

export type PaginationDTO = {
    page?: number,
    size?: number,
    total?: number,
    totalPages?: number
}

export type BookReviewsDTOList = {
    pagination?: PaginationDTO,
    result?: BookReviewsDTO[];
};

export interface CategoryStateProps {
    bookReviewsList: BookReviewsDTOList | null;
    bookReviewsFdd: BookReviewsDTO[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    bookReviews: CategoryStateProps;
}

export interface queryStringParams {
    direction?: string;
    page?: number;
    per_page?: number;
    bookId?: string;
    sort?: string;
}