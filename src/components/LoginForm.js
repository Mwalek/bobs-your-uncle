import { state, setState } from "../state";
import { getEl, createEl } from "../helpers";
import { sidebar, loginForm, username, password } from "../config";

/**
 * Display the login form on the page.
 * @return {null} Brief description of the returning value here.
 * @export
 */

export function render() {
  if (state.loggedIn === true || isRendered(loginForm)) {
    return;
  }

  const form = createEl("form");
  form.id = loginForm;
  form.innerHTML = `
        <h3>Log In</h3>
        <p><label for="username">Username: </label></p>
        <p><input id="${username}" class="username" type="text" name="username" vale="" /></p>
        <p><label for="password">Password: </label></p>
        <p><input id="${password}" class="password" type="password" name="password" vale="" /></p>
        <p><button id="login-button" class="button submit" type="button">Login</button></p>
        `;

  getEl(sidebar).appendChild(form);
}
