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

  http.get("/courses/toprated", async () => {
    await delay(2000);
    const top10Rated = [...courses]
      .sort((a, b) => b.average_rating - a.average_rating)
      .slice(0, 10);

    return HttpResponse.json({
      courses: top10Rated,
      total: top10Rated.length,
    });
  }),

  http.get("/courses", async ({ request }) => {
    await delay(2000);

    const url = new URL(request.url);
    const params = url.searchParams;
    const page = parseInt(params.get("page")) || 1;
    const perPage = parseInt(params.get("perPage")) || 6;
    const category = params.get("category");
    const rating = params.get("rating");
    const difficulty = params.get("difficulty");
    const price = params.get("price");
    const duration = params.get("duration");
    const sortOption = params.get("sortOption");
    const searchQuery = params.get("q");

    let filteredCourses = courses;

    if (searchQuery) {
      filteredCourses = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      const selectedCategories = category.split(",");
      filteredCourses = filteredCourses.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    if (rating) {
      filteredCourses = filteredCourses.filter(
        (course) => course.average_rating >= rating
      );
    }

    if (difficulty) {
      filteredCourses = filteredCourses.filter(
        (course) => course.recommended_level === difficulty
      );
    }

    if (price) {
      filteredCourses = filteredCourses.filter((course) =>
        price === "free" ? course.cost === "gratuito" : course.cost === "pago"
      );
    }

    if (duration) {
      filteredCourses = filteredCourses.filter((course) => {
        if (duration === "short") return course.duration === "curto";
        if (duration === "medium") return course.duration === "médio";
        if (duration === "long") return course.duration === "longo";
      });
    }

    switch (sortOption) {
      case "Avaliações":
        filteredCourses = filteredCourses.sort(
          (a, b) => b.average_rating - a.average_rating
        );
        break;
      case "Data de Início":
        filteredCourses = filteredCourses.sort(
          (a, b) => new Date(a.start_date) - new Date(b.start_date)
        );
        break;
      case "Data de Criação":
        filteredCourses = filteredCourses.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "Total de avaliações":
        filteredCourses = filteredCourses.sort(
          (a, b) => b.total_reviews - a.total_reviews
        );
        break;
      default:
        break;
    }

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedCourses = filteredCourses.slice(start, end);

    return HttpResponse.json({
      courses: paginatedCourses,
      total: filteredCourses.length,
    });
  }),

  http.get("/categories", async () => {
    await delay(2000);
    return HttpResponse.json({
      categories,
    });
  }),

  http.post("/login", async ({ request }) => {
    await delay(2000);
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
      const user = users.users.find((user) => user.username === username);

      if (user) {
        return HttpResponse.json(
          {
            type: "password",
            message: "Password incorreta",
          },
          401
        );
      } else {
        return HttpResponse.json(
          {
            type: "username",
            message: "Utilizador não encontrado",
          },
          404
        );
      }
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

  http.get("/courses/:courseId", async ({ params }) => {
    await delay(2000);
    const courseId = params.courseId;
    const course = courses.find((course) => course.id.toString() === courseId);

    if (!course) {
      return HttpResponse.json(
        {
          message: "Curso não encontrado",
        },
        404
      );
    }

    return HttpResponse.json({
      course,
    });
  }),

  http.get("/users/:userId", async ({ params }) => {
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

    const userCoursesInProgress = courses.filter((course) =>
      user.courses_in_progress.includes(course.id)
    );

    const { password, ...userProfile } = user;

    return HttpResponse.json({
      user: userProfile,
      coursesInProgress: userCoursesInProgress,
    });
  }),

  http.get("/users/:userId/favourites", async ({ params }) => {
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

    const userFavourites = courses.filter((course) =>
      user.favourites.includes(course.id)
    );

    return HttpResponse.json({
      userFavourites,
    });
  }),
];
