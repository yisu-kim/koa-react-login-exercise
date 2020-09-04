import Router from "@koa/router";
import books from "./books";

const api = new Router();

api.use("/books", books.routes());

export default api;
