const supertest = require("supertest");
const app = require("../../app");

describe("Testing Blog-API", () => {
	// Testing app.get("/")
	test("app.get('/')", async () => {
		const { status, body } = await supertest(app).get("/");
		expect(status).toBe(200);
		expect(body).toEqual({ status: true, message: "Welcome to Blog-API." });
	});

	test("app.get('/api/articles')", async () => {
		const { status, body } = await supertest(app).get("/api/articles");
		expect(status).toBe(200);
		expect(body.status).toBeTruthy();
		expect(body.articles).toBeDefined();
	});

	test("app.get('/api/articles/:id')", async () => {
		const id = "636790adaa3e4ce035c154ed";
		const { status, body } = await supertest(app).get(`/api/articles/${id}`);
		expect(status).toBe(200);
		expect(body.status).toBeTruthy();
		expect(body.article).toBeDefined();
	});
});

// supertest(app)
// .get("/api/articles")
// .expect('content-Type', /json/)
// .expect(200)
// .
