import { TuitionStatus } from "./tuition-status.enum";

export interface Tuition {
    tuitionId: string;
    studentId: string;
    departmentId: string;
    amount: number;              // BigDecimal → number
    dueDate: string;             // LocalDate → string (ISO format)
    paidAt: string | null;       // LocalDateTime → string hoặc null
    status: TuitionStatus;
}
