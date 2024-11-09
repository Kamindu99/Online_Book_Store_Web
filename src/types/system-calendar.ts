
export type CalendarCode = {
  calenderDate?: string,
  sysCalId?: number,
  reason?: string
};


export type CalendarCodePost = {
  calenderDate?: string,
  reason?: string
};


export type CalendarCodes = {
  calenderDate?: string,
  sysCalId?: number,
  reason?: string
};


export type CalendarCodeList = {
  pagination: {
    count?: number,
    from?: number,
    to?: number,
    total?: number
  }
  result?: Array<CalendarCodes>
};

export interface CalendarCodeProps {
  calendarCodes?: any;
  calendarCodesFdd?: CalendarCodes[] | null;
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