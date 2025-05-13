import { CreateAccountRequestBase } from "./create-account-request-base";


export interface CreateAccountForParentRequest extends CreateAccountRequestBase {
  parentId?: string;
}
