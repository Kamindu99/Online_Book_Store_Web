// ==============================|| USER Types ||============================== //

export type UserPostReq = {
  userId?: number;
  userName?: string;
  password?: string;
  rePassword?: string;
  description?: string;
  userStatus?: string;
  accountOptionLink?: boolean;
  accountOptionManual?: boolean;
  forceChangePassword?: boolean;
  generateOnetimePassword?: boolean;
  specialPermissionRoles?: any;
  groups?: any;
  statusId?: number;
  userRoleId?: number;
  branchId?: number;
  departmentId?: number;
  email?: string;
  mobileNumber?: string;
  nic?: string;
  designation?: string;
  fullName?: string;
  empNo?: string;
};

export type Users = {
  address?: string;
  desc?: string;
  empEmail?: string;
  empMobileNumber?: string;
  empNic?: string;
  empNumber?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  designationId?: number;
  employeeId?: null;
  userRoleId?: number;
  statusId?: number;
  userId?: number;
  userName?: string;
  isActive?: boolean;
  wfProcessId?: number;
  keycloakUserId?: number;
  departmentId?: number;
  branchId?: number;
  fullName?: string;
};

export interface UserDefaultBranch {
  // ==============================|| USER TYPES ||============================== //
  _id?: string;
  email?: string;
  isActive?: boolean;
  createdDate?: string;
  firstName?: string;
  lastName?: string;
  occupation?: string;
  profileImage?: string;
}

export type UserList = {
  pagination?: {
    count?: number;
    from?: number;
    to?: number;
    total?: number;
  }
  result?: Array<Users>
}

export interface UserStateProps {
  userList?: UserList | null;
  users?: Users | null;
  userById?: Users | null;
  userDefaultBranchById?: UserDefaultBranch | null;
  selectUsers?: Users[] | null;
  error?: object | string | null;
  success?: object | string | null;
  EditProfileSuccess?: object | string | null;
  isLoading?: boolean;
}

export interface DefaultRootStateProps {
  users: UserStateProps;
}

export interface queryParamsProps {
  page: number;
  per_page: number;
  sort: string;
  direction: "asc" | "desc";
  search: string;
}