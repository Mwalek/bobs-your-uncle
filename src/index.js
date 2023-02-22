import style from "./index.css";
import headerStyle from "./header.scss";
import logo from "./assets/images/user-circle-icon.png";
import "./assets/fonts/Lato-Black.ttf";

// WP Related Stuff
import * as config from "./config";
import { getEl, createEl, removeEl, isRendered } from "./helpers";
import { state, setState } from "./state";

import { init as Authentication } from "./components/Authentication";
import { init as Header } from "./components/Header";
import { init as Posts } from "./components/Posts";

const logoEl = document.getElementById("logo");
const siteTitle = document.getElementById("site-title");
siteTitle.classList.add([headerStyle.site_title], ["center-text"]);

logoEl.src = logo;

(function init() {
  console.table(state);
  console.log(config.siteDescription);
  Authentication();
  Header();
  Posts();
})();
