import { SignUp } from '../../pages/SignUp'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const signUpPage = new SignUp();

  root.append(signUpPage.getContent()!);
});
