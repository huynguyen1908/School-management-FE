export interface CreateNotificationRequest {
  sender: string;
  title: string;
  content: string;
  receiver?: string;   
  receiverRole?: string;
}
