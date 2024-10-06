export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "short-answer" | "long-answer";
  options?: string[];
}
