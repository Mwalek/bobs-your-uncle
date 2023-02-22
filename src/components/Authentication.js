import axios from "axios";
import Cookies from "js-cookie";
import formurlencoded from "form-urlencoded";

import { init as Posts } from "./Posts";
import { render as LoginForm } from "./LoginForm";

import { state, setState } from "../state";
import { getEl } from "../helpers";
import { loginForm, loginBtn, logoutBtn } from "../config";

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
  Posts();
}

export function logout() {
  setState("loggedIn", false);
  getEl(logoutBtn).classList.add("hidden");
  getEl(loginBtn).classList.remove("hidden");
  Posts();
}

export function initLogin() {
  const prevLogin = getEl(loginBtn);
  const newLogin = prevLogin.cloneNode(true);
  prevLogin.parentNode.replaceChild(newLogin, prevLogin);
  getEl(loginBtn).addEventListener("click", (event) => {
    event.preventDefault();

    const creds = {
      username: "",
      password: "",
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
      .catch((error) => console.error(error));
  });
}

export function initLogout() {
  const prevLogout = getEl(logoutBtn);
  const newLogout = prevLogout.cloneNode(true);
  prevLogout.parentNode.replaceChild(newLogout, prevLogout);
  getEl(logoutBtn).addEventListener("click", (event) => {
    event.preventDefault();
    Cookies.remove(state.token, { secure: true });
    init();
  });
}
