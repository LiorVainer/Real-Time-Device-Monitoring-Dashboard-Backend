export interface Alert {
  importance: "low" | "medium" | "high";
  title: string;
  description: string;
  type: "alert";
  createdAt: Date;
  level: number;
}

export const ALERT_WS_TYPE = "alert";

export interface WsAlert {
  type: string;
  data: Alert;
}
