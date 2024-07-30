import React, { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Fetch posts from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Handle form submission to create a new post
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title,
      body,
      userId: Math.random().toString(36).slice(2),
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(post => {
        setPosts([post, ...posts]);
        setTitle('');
        setBody('');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;