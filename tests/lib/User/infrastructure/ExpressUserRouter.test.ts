import request from "supertest";
import express from "express";
import { ExpressUserRouter } from "../../../../src/lib/User/infrastructure/ExpressUserRouter";
import { UserStub } from "../domain/UserStub";

let app: express.Application;

describe("ExpressUserRouter should", () => {
  let user1Id: string;
  let user2Id: string;

  beforeEach(async () => {
    app = express();
  
    app.use(express.json());
    app.use(ExpressUserRouter);
  
    const user1 = UserStub.create();
    const user2 = UserStub.create();

    const response1 = await request(app).post("/users").send({
      name: user1.name.value,
      email: user1.email.value,
      createdAt: user1.createdAt.format(),
      password: user1.password?.value
    });
    expect(response1.status).toBe(201);
    user1Id = response1.body.id;

    const response2 = await request(app).post("/users").send({
      name: user2.name.value,
      email: user2.email.value,
      createdAt: user2.createdAt.format(),
      password: user1.password?.value
    });
    expect(response2.status).toBe(201);
    user2Id = response2.body.id;
  });

  afterEach(async () => {
    if (user1Id) {
      const deleteResponse1 = await request(app).delete(`/users/${user1Id}`);
      expect(deleteResponse1.status).toBe(204);
    }
    if (user2Id) {
      const deleteResponse2 = await request(app).delete(`/users/${user2Id}`);
      expect(deleteResponse2.status).toBe(204);
    }
    const getResponseAfterDeletion = await request(app).get("/users");
    expect(getResponseAfterDeletion.body.length).toBe(0);
  });

  it("should return an array of users with valid structure", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const user of response.body) {
      expect(user.id).toMatch(/^[0-9a-fA-F-]{36}$/);
      expect(typeof user.name).toBe("string");
      expect(typeof user.email).toBe("string");
      expect(new Date(user.createdAt).toString()).not.toBe("Invalid Date");
    }
  });

  it("return a user by id", async () => {
    const response = await request(app).get(`/users/${user1Id}`);

    expect(response.status).toBe(200);

    expect(response.body.id).toBe(user1Id);
  });

  it("create a user", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.format(),
      password: user.password?.value
    });

    expect(responseOfCreation.status).toBe(201);

    const userId = responseOfCreation.body.id;

    await request(app).delete(`/users/${userId}`);
  });

  it("update a user", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.format(),
      password: user.password?.value
    });

    expect(responseOfCreation.status).toBe(201);

    const updatedUser = UserStub.update("new name", user);
    const createdUserId = responseOfCreation.body.id;

    const response = await request(app).put(`/users/${createdUserId}`).send({
      name: updatedUser.name.value,
      email: updatedUser.email.value,
      createdAt: updatedUser.createdAt.format(),
      password: user.password?.value
    });

    expect(response.status).toBe(204);

    await request(app).delete(`/users/${createdUserId}`);
  });

  it("delete a user", async () => {
    const user = UserStub.create();

    const responseOfCreation = await request(app).post("/users").send({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt.format(),
      password: user.password?.value
    });

    expect(responseOfCreation.status).toBe(201);

    const createdUserId = responseOfCreation.body.id;

    const response = await request(app).delete(`/users/${createdUserId}`);

    expect(response.status).toBe(204);
  });
});
