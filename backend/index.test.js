import request from "supertest";
import app from ".";

// To Run Use: NODE_OPTIONS=--experimental-vm-modules npx jest

describe('POST /articles/', () => {
  test('should respond with a 400 status code', async () => {
    const response = await request(app)
      .post('/articles')
      .send({
        title: "title"
      });

      expect(response.statusCode).toBe(400);
  });

  test('should specify json in the content type header', async () => {
    const response = await request(app)
      .post('/articles')
      .send({
        title: "title",
        content: "content"
      });

      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });

  test('response has title', async () => {
    const response = await request(app)
      .post('/articles')
      .send({
        title: "title",
        content: "content"
      });

    expect(response.body.title).toBeDefined();
  });

  test('response has content', async () => {
    const response = await request(app)
      .post('/articles')
      .send({
        title: "title",
        content: "content"
      });

    expect(response.body.content).toBeDefined();
  });

  test('should respond with a 201 status code', async () => {
    const response = await request(app)
      .post('/articles')
      .send({
        title: "title",
        content: "content"
      });

      expect(response.statusCode).toBe(201);
  });
});

describe('GET /articles/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
    .get('/articles');
      
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /users/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app)
      .get('/users');
      
      expect(response.statusCode).toBe(200);
  });
});

describe('POST /users/', () => {
  test('should respond with a 201 status code', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: "email",
        username: "username",
        password: "password"
      });
      
      expect(response.statusCode).toBe(201);
  });

  test('should respond with a 400 status code when email is missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: "username",
        password: "password"
      });
      
      expect(response.statusCode).toBe(400);
  });

  test('should respond with a 400 status code when username is missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: "email",
        password: "password"
      });
      
      expect(response.statusCode).toBe(400);
  });

  test('should respond with a 400 status code when password is missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: "email",
        username: "username"
      });
      
      expect(response.statusCode).toBe(400);
  });
});