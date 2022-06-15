import { routes } from "../src/0_routes/routes";
import request from "supertest";
import {jest} from '@jest/globals'

const api = routes;


//Test get all
describe("Trees, The GET", () => {
  it("GET all Trees", async () => {
    const result = await request(api).get("/api/Trees/");
    expect(result.status).toEqual(200);
  });
});
//Test get with id
describe("Trees, The GET with id", () => {
  it("GET 1 Tree", async () => {
    const result = await request(api).get("/api/Trees/6");
    expect(result.body).toEqual({
      'No': '6',
      "TreeType": "Oak",
      "HumidityMin": 30,
      "HumidityMax": 40,
      "TempMin": 20,
      "TempMax": 30,
      "UserId": "UserID",
      "BarCode": "2000",
      "__v": 0,
      "_id": "62a9a1b7ca446cd657331bcc"
    })
    expect(result.status).toEqual(200);
  });
});


//Test update
describe("Update a tree", () => {
  it("Should update a tree", async () => {
    const result = await request(api).put("/api/Trees/1");
    expect(result.status).toEqual(200);
  });
});

