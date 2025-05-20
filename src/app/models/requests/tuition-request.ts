import { TuitionStatus } from "../tuition-status.enum";

export interface TuitionRequest {
  studentId: string;
  departmentId: string;
  amount: number;
  dueDate: string;
  status: TuitionStatus;
}