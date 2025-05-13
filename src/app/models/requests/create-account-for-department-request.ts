import { CreateAccountRequestBase } from "./create-account-request-base";

export interface CreateAccountForDepartmentRequest extends CreateAccountRequestBase {
  departmentId?: string;
  role: 'ADMIN' | 'MANAGER' | 'ACCOUNTING'| 'OFFICE'; // hoặc enum tương ứng
}
