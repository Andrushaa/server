import './App.css';
import React, {useEffect, useState} from 'react';
import PostList from "./components/postList/postList";
import MyButton from "./components/UI/button/myButton";
import PostForm from "./components/postForm/PostForm";
import axios from "axios";
import Modal from "./components/UI/Modal/Modal";
import Form from "./components/form/form";

function App() {
    const [posts, setPosts] = useState([])
    const [postsLoading, setPostsLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalActive(false)
    }

    async function fetchPosts() {
        setPostsLoading(true)
        setTimeout( async ()=>{
            const response = await axios.get('https://jsonplaceholder.typicode.com/comments')
            setPosts(response.data)
            setPostsLoading(false);
            }, 1000)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
      <>
          <MyButton onClick={fetchPosts}>Get posts</MyButton>

          <MyButton onClick={() => setModalActive(true)}>
              New modal window
          </MyButton>
          <Modal active={modalActive} setActive={setModalActive}>
              <PostForm create={createPost}/>
          </Modal>
          <Form/>

          {postsLoading
              ? <h1>Загрузка</h1>
              :
              posts.length !== 0
                  ? <PostList remove={removePost} posts={posts} title="List of comments"/>
                  : <h1 style={{textAlign: 'center'}}>
                      No comments found
                  </h1>
          }
      </>
    );
};

export default App;
