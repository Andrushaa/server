import './App.css';
import React, {useEffect, useState} from 'react';
import PostList from "./components/postList/postList";
import MyButton from "./components/UI/button/myButton";
import PostForm from "./components/postForm/PostForm";
import MyModal from "./components/UI/MyModal/MyModal";
import axios from "axios";

function App() {
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false);
    const [postsLoading, setPostsLoading] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
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
          <MyButton onClick={() => setModal(true)}>
              Создать пост
          </MyButton>
          <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost}/>
          </MyModal>

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
