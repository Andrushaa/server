import React from 'react';
import MyButton from "../UI/button/myButton";
import './postItem.css'

const PostItem = (props) => {
//    console.log(props)
    return (
        <div  className="post">
            <div className="post__content">
                <div className="post__name">
                    {props.number} {props.post.name}
                </div>
                <div className="post__email">
                    {props.post.email}
                </div>
                <div className="post__body">
                    {props.post.body}
                </div>
            </div>
            <div className="post__btn">
                <MyButton onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;