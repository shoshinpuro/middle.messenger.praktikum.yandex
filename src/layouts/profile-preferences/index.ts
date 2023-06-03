import { ProfilePreferences } from '../../pages/ProfilePreferences'

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root')!;

  const profilePreferencesPage = new ProfilePreferences();

  root.append(profilePreferencesPage.getContent()!);
});
