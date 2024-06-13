import { http, HttpResponse } from "msw";
import courses from "./courses.json";

export const handlers = [
  http.get("/courses", () => {
    return HttpResponse.json({
      courses,
    });
  }),

  http.get("/courses/page/:page", (req, res) => {
    const page = parseInt(req.params.page, 10);
    const perPage = 6
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = courses.slice(start, end);
    const total = courses.length;

    return HttpResponse.json({ data, total });
  }),
];
