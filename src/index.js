import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import "./db";
import { jwtMiddleware } from "lib/token";

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4000;

app.use(bodyParser());
app.use(jwtMiddleware);

router.use("/api", api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`✅ server is listening to port ${PORT}`);
});
