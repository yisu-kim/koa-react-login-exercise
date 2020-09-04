import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import api from "./api";
import "./db";

const app = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4000;

app.use(bodyParser());

router.use("/api", api.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`✅ server is listening to port ${PORT}`);
});
