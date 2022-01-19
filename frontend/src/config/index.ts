const isProduction = false;
export const path = isProduction
  ? "https://api.todo.com"
  : "http://localhost:3000";
