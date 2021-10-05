import './App.css';
import React, {useEffect, useState} from 'react';
import Api  from "./components/api"
import PostItem from "./components/postItem/postItem";
import PostList from "./components/postList";
import MyButton from "./components/UI/button/myButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MyModal from "./components/UI/MyModal/MyModal";
import axios from "axios";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: "Javascript", body: 'Description'},
        {id: 2, title: "html", body: 'Description'},
        {id: 3, title: "css", body: 'Description'},
    ])
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
      <>
          <MyButton onClick={fetchPosts}>Get posts</MyButton>
          <MyButton onClick={() => setModal(true)}>
              Создать пост
          </MyButton>
          <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost}/>
          </MyModal>

          {posts.length !== 0
              ? <PostList remove={removePost} posts={posts} title="Список постов 1"/>
              : <h1 style={{textAlign: 'center'}}>
                  Посты не найдены
                </h1>

          }

      </>
    );
};

export default App;
