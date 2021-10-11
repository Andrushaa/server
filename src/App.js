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
import {getPageCount, getPagesArray} from "./components/utils/pages";

function App() {
    const [posts, setPosts] = useState([])
   // const [postsLoading, setPostsLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    let pagesArray = getPagesArray(totalPages);
    console.log([pagesArray])

    const [fetchPosts, postsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']

        setTotalPages(getPageCount(totalCount, limit));
    })


    useEffect(() => {
        fetchPosts()
    }, [page])
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalActive(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

  return (
      <>
          <MyButton onClick={fetchPosts}>Get posts</MyButton>

          <MyButton onClick={() => setModalActive(true)}>
              Add new comment
          </MyButton>
          <Modal active={modalActive} setActive={setModalActive}>
              <PostForm create={createPost}/>
          </Modal>

          {postError &&
              <h1>Произошла ошибка ${postError}</h1>
          }

          {postsLoading
              ? <Loader/>
              : posts.length !== 0
                  ? <PostList remove={removePost} posts={posts} title="List of comments"/>
                    :<h1 className='MainTitle'>no comments found</h1>
          }

          <div className="page__wrapper">
              {pagesArray.map(p =>
                  <span
                      onClick={() => changePage(p)}
                      key={p}
                      className={page === p ? 'page page__current' : 'page'}
                  >
                      {p}
                  </span>
              )}
          </div>


      </>
    );
};

export default App;
