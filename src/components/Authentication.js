import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

import { init as Posts } from "./Posts";
import { render as LoginForm } from "./LoginForm";
import { render as LogoutForm } from "./LogoutForm";
import { render as Editor } from "./Editor";
import { render as Notice } from "./Notice";

import { state, setState } from "../state";
import { getEl, removeEl } from "../helpers";
import {
  editor,
  loginForm,
  logoutForm,
  loginBtn,
  loginSubmitBtn,
  logoutBtn,
  username,
  password,
} from "../config";

export function init() {
  if (Cookies.get(state.token) === undefined) {
    console.log("Logged out...");
    logout();
    initLogin();
  } else {
    console.log("Logged in!");
    login();
    initLogout();
  }
}

export function login() {
  setState("loggedIn", true);
  getEl(loginBtn).classList.add("hidden");
  getEl(logoutBtn).classList.remove("hidden");
  removeEl(loginForm);
  Notice("loggedin");
  LogoutForm();
  Editor();
  Posts();
}

export function logout() {
  setState("loggedIn", false);
  Notice("loggedout");
  LoginForm();
  removeEl(logoutForm);
  removeEl(editor);
  getEl(logoutBtn).classList.add("hidden");
  getEl(loginBtn).classList.remove("hidden");
  Posts();
}

export function initLogin() {
  const prevLogin = getEl(loginBtn);
  const newLogin = prevLogin.cloneNode(true);
  prevLogin.parentNode.replaceChild(newLogin, prevLogin);
  getEl(loginSubmitBtn).addEventListener("click", (event) => {
    event.preventDefault();

    const creds = {
      username: getEl(username).value,
      password: getEl(password).value,
    };

    axios({
      method: "post",
      url: state.restUrl + "jwt-auth/v1/token",
      data: formurlencoded(creds),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (200 === response.status) {
          Cookies.set(state.token, response.data.token, {
            expires: 1,
            secure: true,
          });
          init();
        }
      })
      .catch((error) => console.error(error.message));
  });
}

export function initLogout() {
  const prevLogout = getEl(logoutBtn);
  const newLogout = prevLogout.cloneNode(true);
  prevLogout.parentNode.replaceChild(newLogout, prevLogout);
  getEl(logoutForm).addEventListener("submit", (event) => {
    event.preventDefault();
    Cookies.remove(state.token, { secure: true });
    init();
  });
}
