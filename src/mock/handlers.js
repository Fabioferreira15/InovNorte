import { http, HttpResponse } from "msw";
import courses from "./courses.json";
import categories from "./categories.json";

export const handlers = [
  /* Cursos */
  http.get("/courses", () => {
    return HttpResponse.json({
      courses,
      total: courses.length,
    });
  }),

/*   http.get("/courses/page/:page", (req, res) => {
    const page = parseInt(req.params.page, 10);
    const perPage = 6;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = courses.slice(start, end);
    const total = courses.length;

    return HttpResponse.json({ data, total });
  }), */

  /* categorias */
  http.get("/categories", () => {
    return HttpResponse.json({
      categories,
    });
  }),
];
