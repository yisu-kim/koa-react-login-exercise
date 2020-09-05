import Router from "@koa/router";
import { list, get, create, del, replace, update } from "./books.controllder";

const books = new Router();

books.get("/", list);
books.get("/:id", get);

books.post("/", create);

books.delete("/:id", del);

books.put("/:id", replace);

books.patch("/:id", update);

export default books;
