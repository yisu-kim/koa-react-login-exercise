import Router from "@koa/router";
import { list, create, del, replace, update } from "./books.controllder";

const books = new Router();

books.get("/", list);

books.post("/", create);

books.delete("/", del);

books.put("/", replace);

books.patch("/", update);

export default books;
