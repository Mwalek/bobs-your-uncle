import style from "./index.css";
import mainStyle from "./style.scss";
import headerStyle from "./header.scss";
import logo from "./assets/images/user-circle-icon.png";
import "./assets/fonts/Lato-Black.ttf";
// Quill
import Quill from "quill/core";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";

Quill.register({
  "modules/toolbar": Toolbar,
  "themes/snow": Snow,
  "formats/bold": Bold,
  "formats/italic": Italic,
  "formats/header": Header,
});

export default Quill;

// WP Related Stuff
import * as config from "./config";
import { getEl, createEl, removeEl, isRendered } from "./helpers";
import { state, setState } from "./state";

import { init as Authentication } from "./components/Authentication";
import { init as myHeader } from "./components/Header";
import { init as Posts } from "./components/Posts";

const logoEl = document.getElementById("logo");
const siteTitle = document.getElementById("site-title");
siteTitle.classList.add(headerStyle.site_title, ["center-text"]);

logoEl.src = logo;

(function init() {
  console.table(state);
  console.log(config.siteDescription);
  Authentication();
  myHeader();
  Posts();
})();
