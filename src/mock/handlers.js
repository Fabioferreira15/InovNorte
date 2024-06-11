import { http, HttpResponse } from "msw";
import courses from "./courses.json";

export const handlers = [
  http.get("/courses", () => {
    return HttpResponse.json({
      courses,
    });
  }),
];
