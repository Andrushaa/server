import './App.css';
import React, {useState} from 'react';
import Api  from "./components/api"
import PostItem from "./components/postItem";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Javascript", body: 'Description'},
        {id: 2, title: "html", body: 'Description'},
        {id: 3, title: "css", body: 'Description'},
    ])
  return (
      <>
          <h1>Список постов</h1>
          {posts.map((post) =>
            <PostItem post={post} key={post.id}/>
          )}
      </>

  );
}

export default App;
