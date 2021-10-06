import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/myButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({name: '', email:'', body:''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        if (newPost.name !== '' && newPost.email !== '' && newPost.body !== '') {
            create(newPost)
            setPost({name: '', email:'', body:''})
        }
    }

    return (
        <form>
            <MyInput
                value={post.name}
                onChange={e => setPost({...post, name: e.target.value})}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.email}
                onChange={e => setPost({...post, email: e.target.value})}
                type="email"
                placeholder="Введите email"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Описание поста"
            />
            <MyButton onClick={addNewPost}>Create a new post</MyButton>
        </form>
    );
};

export default PostForm;