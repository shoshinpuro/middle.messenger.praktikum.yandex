import { Error500 } from '../../pages/500'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const Error500Page = new Error500();

  root.append(Error500Page.getContent()!);
});
