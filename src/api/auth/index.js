import Router from "@koa/router";
import {
  localRegister,
  localLogin,
  exists,
  logout,
  check,
} from "./auth.controller";

const auth = new Router();

auth.post("/register/local", localRegister);
auth.post("/login/local", localLogin);
auth.get("/exists/:key(email|username)/:value", exists);
auth.post("/logout", logout);
auth.get("/check", check);

export default auth;
