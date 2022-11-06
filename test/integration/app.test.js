const supertest = require("supertest");
const app = require("../../app");

describe("Testing Blog-API", () => {
	// Testing app.get("/")
	test("app.get('/')", async () => {
		const { status, body } = await supertest(app).get("/");
		expect(status).toBe(200);
		expect(body).toEqual({ status: true, message: "Welcome to Blog-API." });
	});

	// Testing app.get('/api/articles').
	test("app.get('/api/articles')", async () => {
		const { status, body } = await supertest(app).get("/api/articles");
		expect(status).toBe(200);
		expect(body.status).toBeTruthy();
		expect(body.articles).toBeDefined();
	});

	// Testing app.get('/api/articles/:id').
	test("app.get('/api/articles/:id')", async () => {
		const id = "636790adaa3e4ce035c154ed";
		const { status, body } = await supertest(app).get(`/api/articles/${id}`);
		expect(status).toBe(200);
		expect(body.status).toBeTruthy();
		expect(body.article).toBeDefined();
	});

	// Testing app.post('/api/signup').
	test("app.post('/api/signup')", async () => {
		const reqBody = {
			email: "sam.gmail.com",
			first_name: "sam",
			last_name: "ibrahim",
			password: "sam12345",
			user_type: "admin",
		};
		const { status, body } = await supertest(app).post("/api/signup").send(reqBody);
		expect(status).toBe(200);
		expect(body.status).toBeTruthy();
		expect(body._id).toBeDefined();
		expect(body.email).toBeDefined();
		expect(body.user_type).toBeDefined();
		expect(body.token).toBeDefined();
	});
});

afterAll(() => {});
