const request = require("supertest");
const app = require("../src/app");

describe("API endpoints", () => {
  // If I had a DB this could be reset on each test.
  // As I'm saving everything in memory I can't reset the server and preserve state.
  const server = request(app);
  describe("getScores", () => {
    it("Should return no scores initially", async () => {
      const res = await server.get("/api/getScores");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });

    it("Should return 5 scores max", async () => {
      // Populating the state with 6 items
      for (const index of [...Array(6).keys()]) {
        await server
          .post("/api/submitEntry")
          .send({ name: `test${index + 1}`, word: "abba".repeat(index + 1) });
      }

      const res = await server.get("/api/getScores");
      expect(res.body.length).toEqual(5);
    });

    it("Should return a descending scores", async () => {
      const res = await server.get("/api/getScores");

      const sorted = res.body.sort((a, b) => b.score - a.score);
      expect(res.body).toEqual(sorted);
    });
  });

  describe("submitEntry", () => {
    describe("validateEntry", () => {
      it("Should return 419 on empty user", async () => {
        const res = await server
          .post("/api/submitEntry")
          .send({ name: "test", word: "" });
        expect(res.statusCode).toEqual(419);
      });
      it("Should return 419 on empty word", async () => {
        const res = await server
          .post("/api/submitEntry")
          .send({ name: "", word: "asd" });
        expect(res.statusCode).toEqual(419);
      });

      it("Should return 419 on empty body", async () => {
        const res = await server.post("/api/submitEntry").send({});
        expect(res.statusCode).toEqual(419);
      });
    });

    it("Should not save score on not palindrome", async () => {
      const res = await server
        .post("/api/submitEntry")
        .send({ name: "test", word: "test" });
      expect(res.statusCode).toEqual(419);
    });

    it("Should save and return points scored on palindrome", async () => {
      const res = await server.post("/api/submitEntry").send({
        name: "test",
        word: "abba",
      });
      expect(res.body).toEqual(4);
    });

    it("Should overwrite a users score", async () => {
      // To get a clean state, we reset this.
      const server = request(app);
      const first = await server.post("/api/submitEntry").send({
        name: "test",
        word: "abba",
      });
      expect(first.body).toEqual(4);

      const second = await server.post("/api/submitEntry").send({
        name: "test",
        word: "abbaabba",
      });
      expect(second.body).toEqual(8);
    });
  });
});
