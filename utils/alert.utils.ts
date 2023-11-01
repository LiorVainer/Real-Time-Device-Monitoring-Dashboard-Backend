import { Alert } from "../models/alert.model";

export const generateRamdomAlert = (): Alert => {
  const randomLevel: number = Math.floor(Math.random() * 100);
  let importance: Alert["importance"] = "low";
  let title: Alert["title"] = "talk";
  if (randomLevel > 50) {
    importance = "medium";
    title = "fall";
  } else if (randomLevel > 80) {
    importance = "high";
    title = "fire";
  }

  return {
    importance,
    title,
    description: `This is an alert of ${title} with level ${randomLevel}`,
    type: "alert",
    createdAt: new Date(),
    level: randomLevel,
  };
};
