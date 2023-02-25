// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components/Editor";
import { init as Posts } from "./components/Posts";
import { render as Notice } from "./components/Notice";

// Import configs
import { state } from "./state";

export function save(post) {
  const token = Cookies.get(state.token);
  axios({
    method: "post",
    url: state.restUrl + "wp/v2/posts",
    data: post,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      console.log(response.data);
      clearEditor();
      Notice("saved");
      Posts();
    })
    .catch((err) => console.error(err.message));
}
