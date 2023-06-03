import { Error404 } from '../../pages/404'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const Error404Page = new Error404();

  root.append(Error404Page.getContent()!);
});
