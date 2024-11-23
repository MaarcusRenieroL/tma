export interface Notification {
  type: "alert" | "update" | "chat" | "task" | "meeting";
  category:
    | "productivity"
    | "communication"
    | "work-life"
    | "engagement"
    | "collaboration"
    | "well-being"
    | "project"
    | "schedule";
  title: string;
  description: string;
  timestamp: string;
  meta?: {
    sender?: string;
    avatar?: string;
    project?: string;
    deadline?: string;
    meetingTime?: string;
    meetingLink?: string;
  };
}
