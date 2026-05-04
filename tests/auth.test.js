import request from "supertest";
import app from "../app.js";

describe("Authentication and route tests", () => {
  test("AC-1: GET / returns the backend home page", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Week 15 Term Project server is running");
  });

  test("AC-2: GET /admin/login returns the admin login page", async () => {
    const res = await request(app).get("/admin/login");

    expect(res.statusCode).toBe(200);
    expect(res.text.toLowerCase()).toContain("login");
  });

  test("AC-3: GET /admin/dashboard redirects unauthenticated users", async () => {
    const res = await request(app).get("/admin/dashboard");

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain("/admin/login");
  });
});