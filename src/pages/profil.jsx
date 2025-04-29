import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import './profil.css';

const params = new URLSearchParams(window.location.search);
const id = params.get('user');

const response = await fetch(`http://localhost:4000/api/users/${id}`);
const user = await response.json();
console.log(user.data);

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>Profil uživatele @{user.data.handle}</h1>
    <img
        className="post__avatar"
        src={`http://localhost:4000${user.data.avatar}`}
        alt={user.data.userName}
      />
    <h2>{user.data.name}</h2>
    <p>Bio: {user.data.bio}</p>
  </div>,
);

/* 
Nyní byste měli mít funkční zobrazení profilu každého uživatele kliknutím na jeho handle v seznamu příspěvků.
*/
