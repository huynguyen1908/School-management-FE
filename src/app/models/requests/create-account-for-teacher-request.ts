import { CreateAccountRequestBase } from "./create-account-request-base";

export interface CreateAccountForTeacherRequest extends CreateAccountRequestBase {
  teacherId?: string;
}
