import axios from "axios";

import { getEl, createEl } from "../helpers";
import { state, setState } from "../state";
import { main } from "../config";
import { render as Post, editLink, deleteLink } from "./Post";

export function init(event) {
  if (event) event.preventDefault();
  axios
    .get(state.restUrl + "wp/v2/posts", {
      params: {
        per_page: 5,
      },
    })
    .then(({ data: posts }) => {
      setState("posts", posts);
      render();
    })
    .catch((error) => console.log(error));
}

export function render() {
  // Clear the current posts from the page
  clear();
  // Map through the posts
  state.posts.map((post) => {
    // Setup the post article element
    const article = createEl("article");
    article.classList.add("post");
    article.innerHTML = `
          <h2 class="entry-title">
            <a href="#${post.slug}">${post.title.rendered}</a>
          </h2>
          <div class="entry-content">${post.excerpt.rendered}</div>      
        `;

    // Attach an event listener on the post link
    article
      .querySelector(".entry-title a")
      .addEventListener("click", (event) => {
        // Prevent the link from going to link
        event.preventDefault();
        // Set the state for post to display
        setState("post", post);
        // Render single post
        Post();
      });

    // If logged in, display edit link
    if (state.loggedIn) {
      article.append(editLink(post));
      article.append(deleteLink(post));
    }

    // Append the post to the page
    getEl(main).append(article);
  });
}

export function clear() {
  getEl(main).innerHTML = "";
}
