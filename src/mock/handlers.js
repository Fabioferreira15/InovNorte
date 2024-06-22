import { http, HttpResponse} from "msw";
import courses from "./courses.json";
import categories from "./categories.json";
import users from "./users.json";


export const handlers = [
  http.get("/courses", () => {
    return HttpResponse.json({
      courses,
      total: courses.length,
    });
  }),

  http.get("/categories", () => {
    return HttpResponse.json({
      categories,
    });
  }),

  http.post("/login", async ({request}) => {
    const { username, password } = await request.json();
    const user = users.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      return HttpResponse.json({
        message: "Login efetuado com sucesso",
        user
      });
      
    } else {
      return HttpResponse.json({
        message: "Credenciais inválidas",
      },401);
    }
  }),
];
