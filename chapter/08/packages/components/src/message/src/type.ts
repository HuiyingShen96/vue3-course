export type IMessageType = 'success' | 'info' | 'warning' | 'error';
export type IMessageParams = {
  text: string;
  type?: IMessageType;
  duration?: number;
};
