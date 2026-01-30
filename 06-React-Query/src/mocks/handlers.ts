import { http, HttpResponse } from "msw";
import { mockDatabase, type MockQuery } from "./db";

export const handlers = [
  http.get("https://rickandmortyapi.com/api/character/", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    const results = mockDatabase[name as MockQuery] || [];
    return HttpResponse.json({ results }, { status: 200 });
  }),
];
