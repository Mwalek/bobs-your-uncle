import { state } from "../state";
import { getEl, isRendered } from "../helpers";
// import { save } from "../crud";
import { primary, main, editor, editorTitle, editorContent } from "../config";
import Quill from "../index";

/**
 * render - Displays the editor on the page
 *
 * @export
 */
export function render() {
  // Make sure user is logged in or editor is not already rendered
  if (state.loggedIn !== true || isRendered(editor)) {
    return;
  }

  // Setup the editor form
  const form = document.createElement("form");
  form.id = editor;
  form.innerHTML = `
      <h3 class="add-new-post">Add New Post</h3>
      <h3><input id="${editorTitle}" type="text" name="title" placeholder="Enter title here" value=""></h3>
      <div id="${editorContent}"></div>
      <p><button class="button">Save</button></p>
    `;

  // Add the login form to the page
  getEl(primary).insertBefore(form, getEl(main));

  // Initialize the quill editor
  var quill = new Quill(`#${editorContent}`, {
    theme: "snow",
  });

  // Add listener to save button that calls save
  getEl(editor).addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
