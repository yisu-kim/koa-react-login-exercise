import Router from "@koa/router";
import books from "./books";
import auth from "./auth";

const api = new Router();

api.use("/books", books.routes());
api.use("/auth", auth.routes());

export default api;
