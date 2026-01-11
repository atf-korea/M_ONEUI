
export enum AppType {
  LAUNCHER = 'LAUNCHER',
  NOTES = 'NOTES',
  CALENDAR = 'CALENDAR',
  CALCULATOR = 'CALCULATOR',
  BROWSER = 'BROWSER',
  GALLERY = 'GALLERY'
}

export interface Notification {
  id: string;
  app: string;
  title: string;
  content: string;
  time: string;
}

export interface PhoneStatus {
  battery: number;
  signal: 'strong' | 'medium' | 'weak';
  deviceName: string;
  isConnected: boolean;
}
