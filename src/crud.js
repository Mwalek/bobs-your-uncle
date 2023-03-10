// Import libraries
import axios from "axios";
import Cookies from "js-cookie";

// Import components
import { clear as clearEditor } from "./components/Editor";
import { init as Posts } from "./components/Posts";
import { render as Notice } from "./components/Notice";
import { htmlDecode } from "./helpers";

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

/**
 * Updates a post
 *
 * @export
 * @param {Object} post The new post to be saved
 */
export function update(post) {
  // Get the token for an authorized request
  const token = Cookies.get(state.token);
  // Update existing post
  axios({
    // Set method to put
    method: "put",
    // set the URL with the current post id
    url: state.restUrl + "wp/v2/posts/" + post.id,
    // Set the post data object to send
    data: post,
    // Set the headers
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      // Clear the editor
      clearEditor();
      // Load a notice post is updated
      Notice("updated");
      // Reload the posts
      Posts();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export function deletePost(post) {
  // Confirm that user wants to delete post
  const confirm = window.confirm(
    `Delete Post: "${htmlDecode(post.title.rendered)}"`
  );
  // Get the token for making an authenticated request
  const token = Cookies.get(state.token);

  // If user confirms delete then proceed
  if (true === confirm) {
    // Setup the API request
    axios({
      // Set method to delete
      method: "delete",
      // Setup the URL for the post to delete
      url: state.restUrl + "wp/v2/posts/" + post.id,
      // Setup headers for authenticated request
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // Clear the editor
        clearEditor();
        // Display delete notice
        Notice("deleted");
        // Load the updated list of posts
        Posts();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
