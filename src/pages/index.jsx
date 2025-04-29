import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import '../global.css';
import './index.css';

const loggedInUserId = 4;
const response = await fetch(
  `http://localhost:4000/api/users/${loggedInUserId}`,
);
const json = await response.json();
const loggedInUser = json.data;

const fetchPosts = async () => {
  const response = await fetch(`http://localhost:4000/api/posts`);
  const json = await response.json();
  return json.data;
};

const posts = await fetchPosts();

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>The Chirp</h1>
    <p>Prihlasen jako {loggedInUser.name}</p>
    <form className="post-form">
      <p>Co máte na srdci?</p>
      <textarea placeholder="Napište něco..." className="post-input"></textarea>
      <button type="submit">Publikovat</button>
    </form>

    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>,
);

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const postId = button.dataset.id;
    await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: 'DELETE',
    });
    window.location.reload();
  });
});

const form = document.querySelector('.post-form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = document.querySelector('.post-input');
  const text = input.value;
  await fetch(`http://localhost:4000/api/posts`, {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      userId: loggedInUser.id,
      userName: loggedInUser.name,
      userHandle: loggedInUser.handle,
      userAvatar: loggedInUser.avatar,
      text: text,
      likes: 0,
    }),
  });
  window.location.reload();
});

