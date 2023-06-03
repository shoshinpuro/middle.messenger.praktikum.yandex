import { EditProfile } from '../../pages/EditProfile'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const editProfilePage = new EditProfile();

  root.append(editProfilePage.getContent()!);
});
