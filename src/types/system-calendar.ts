export type CalendarCode = {
  _id?: string,
  holidayDate?: string,
  reason?: string
  createdDate?: string
  isActive?: boolean
};

export type CalendarCodeList = {
  pagination: {
    count?: number,
    from?: number,
    to?: number,
    total?: number
  }
  result?: Array<CalendarCode>
};

export interface CalendarCodeProps {
  calendarCodes?: any;
  calendarCodesFdd?: CalendarCode[] | null;
  calendarCode?: CalendarCode | null;
  error?: object | string | null;
  success?: object | string | null;
  isLoading?: boolean
};

export interface DefaultRootStateProps {
  calendarCode: CalendarCodeProps;
}

export interface queryParamsProps {
  page?: number
  per_page?: number
  sort?: string
  direction?: "asc" | "desc"
  search?: string
}