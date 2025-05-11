export interface UserAccount {
    userId: string;
    username: string;
    password?: string;       
    isActive: boolean;
    createAt: string;        
    createdBy?: string;
    role: 'PARENT' | 'STUDENT' | 'TEACHER' | 'MANAGER' | 'DEPARTMENT' | 'ADMIN';
  }
  