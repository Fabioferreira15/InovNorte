import { delay, http, HttpResponse } from "msw";
import courses from "./courses.json";
import categories from "./categories.json";
import users from "./users.json";

export const handlers = [
  http.get("/courses/random", async () => {
    await delay(2000);
    const randomCourses = courses.sort(() => Math.random() - 0.5).slice(0, 10);

    return HttpResponse.json({
      courses: randomCourses,
      total: randomCourses.length,
    });
  }),

  http.get("/courses/recents", async () => {
    await delay(2000);
    const recents = [...courses]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    return HttpResponse.json({
      courses: recents,
      total: recents.length,
    });
  }),

  http.get("/toprated", async () => {
    await delay(2000);
    const top10Rated = [...courses]
      .sort((a, b) => b.average_rating - a.average_rating)
      .slice(0, 10);

    return HttpResponse.json({
      courses: top10Rated,
      total: top10Rated.length,
    });
  }),

  http.get("/courses", async () => {
    await delay(2000);
    return HttpResponse.json({
      courses,
      total: courses.length,
    });
  }),

  http.get("/categories", async () => {
    await delay(2000);
    return HttpResponse.json({
      categories,
    });
  }),

  http.post("/login", async ({ request }) => {
    const { username, password } = await request.json();
    const user = users.users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      return HttpResponse.json({
        message: "Login efetuado com sucesso",
        user,
      });
    } else {
      return HttpResponse.json(
        {
          message: "Credenciais inválidas",
        },
        401
      );
    }
  }),

  http.get("/courses/best/:userId", async ({ params }) => {
    await delay(2000);
    const userId = params.userId;
    const user = users.users.find((user) => user.id.toString() === userId);
    console.log(user);

    if (!user) {
      return HttpResponse.json(
        {
          message: "Utilizador não encontrado",
        },
        404
      );
    }

    const { interests, preferred_format } = user;

    const filteredCourses = courses.filter((course) => {
      return (
        interests.some((interest) => course.tags.includes(interest)) &&
        course.format === preferred_format
      );
    });

    const bestCourse =
      filteredCourses.length > 0
        ? filteredCourses.sort((a, b) => b.average_rating - a.average_rating)[0]
        : courses.sort((a, b) => b.average_rating - a.average_rating)[0];

    console.log(bestCourse);
    return HttpResponse.json({
      course: bestCourse,
    });
  }),

  http.get("/courses/interests/:userId", async ({ params }) => {
    await delay(2000);
    const userId = params.userId;
    const user = users.users.find((user) => user.id.toString() === userId);

    if (!user) {
      return HttpResponse.json(
        {
          message: "Utilizador não encontrado",
        },
        404
      );
    }

    const { interests } = user;

    const filteredCourses = courses.filter((course) => {
      return interests.some((interest) => course.tags.includes(interest));
    });

    return HttpResponse.json({
      courses: filteredCourses,
      total: filteredCourses.length,
    });
  }),
];
