export type CategoryCodeDTO = {
    _id?: string;
    categoryCode?: string;
    categoryName?: string;
    createdDate?: string;
    isActive?: boolean;
};

export type PaginationDTO = {
    page?: number,
    size?: number,
    total?: number,
    totalPages?: number
}

export type CategoryCodeDTOList = {
    pagination?: PaginationDTO,
    result?: CategoryCodeDTO[];
};

export interface CategoryStateProps {
    categoryCodeList: CategoryCodeDTOList | null;
    categoryCodeFdd: CategoryCodeDTO[] | null;
    error: object | string | null;
    success: object | string | null;
    isLoading: boolean
}

export interface DefaultRootStateProps {
    categoryCode: CategoryStateProps;
}

export interface queryStringParams {
    direction?: string;
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
}