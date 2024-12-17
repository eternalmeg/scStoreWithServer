export interface Message {
  _id: string;
  sender: string;
  receiver: string;
  about: string;
  content: string;
  senderName?: string;
  timestamp?: Date;
}
