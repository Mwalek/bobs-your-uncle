import style from "./index.css";
import headerStyle from "./header.scss";
import logo from "./assets/images/user-circle-icon.png";
import "./assets/fonts/Lato-Black.ttf";

const logoEl = document.getElementById("logo");
const siteTitle = document.getElementById("site-title");
siteTitle.classList.add([headerStyle.site_title], ["center-text"]);

logoEl.src = logo;
