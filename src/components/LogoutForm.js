import { state, setState } from "../state";
import { getEl, createEl, isRendered } from "../helpers";
import { sidebar, logoutForm } from "../config";

export function render() {
  if (state.loggedIn === false || isRendered(logoutForm)) {
    return;
  }
  const form = createEl("form");
  form.id = logoutForm;
  form.innerHTML = `
  <button class="button submit">
  Logout
  </button>
  `;
  getEl(sidebar).appendChild(form);
}
