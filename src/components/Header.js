import axios from "axios";
import { siteDescription } from "../config";

import * as config from "../config";
import { getEl } from "../helpers";
import { state, setState } from "../state";

export function init() {
  //   getEl(config.siteName)
  //     .querySelector("a")
  //     .addEventListener("click", (event) => {
  //       event.preventDefault();
  //     });
  axios
    .get(state.restUrl)
    .then(({ data: apiInfo }) => {
      console.log(apiInfo);
      setState("siteName", apiInfo.name);
      setState("siteDescription", apiInfo.description);
      update();
    })
    .catch((error) => {
      console.error(error);
      setState("siteName", `Oops, ${error.message.toLowerCase()}!`);
      setState(
        "siteDescription",
        "Built by Mwale with JavaScript and WordPress"
      );
      update();
    });
}

export function update() {
  getEl(config.siteName).querySelector("a").innerText = state.siteName;
  getEl(siteDescription).innerText = state.siteDescription;
}
