import { CreateAccountRequestBase } from "./create-account-request-base";

export interface CreateAccountForStudentRequest extends CreateAccountRequestBase {
  studentId?: string;
}
