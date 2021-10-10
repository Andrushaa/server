import './App.css';
import React, {useEffect, useState} from 'react';
import PostList from "./components/postList/postList";
import MyButton from "./components/UI/button/myButton";
import PostForm from "./components/postForm/PostForm";
import axios from "axios";
import Modal from "./components/UI/Modal/Modal";
import AddComment from "./components/form/addСomment";
import Loader from "./components/UI/loader/Loader"
import PostService from "./components/API/PostService";
import {useFetching} from "./components/hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
   // const [postsLoading, setPostsLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [fetchPosts, postsLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })


    useEffect(() => {
        fetchPosts()
    }, [])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalActive(false)
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
          <AddComment/>

          {postError &&
              <h1>Произошла ошибка ${postError}</h1>
          }

          {postsLoading
              ? <Loader/>
              : <PostList remove={removePost} posts={posts} title="List of comments"/>
          }
      </>
    );
};

export default App;
