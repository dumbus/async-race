import '../sass/style.scss';
import renderPage from './modules/renderPage';

(async () => {
  await renderPage();
})();

console.log(`
Score: 190/190;
[+] Basic structure (25/25)
[+] "Garage" view (50/50)
[+] Car animation (50/50)
[+] Race animation (30/30)
[+] "Winners" view (35/35)
`);
