import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";

const AddComment = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [commentDirty, setCommentDirty] = useState(false)
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [emailError, setEmailError] = useState('Емаил не может быть пустым')
    const [commentError, setCommentError] = useState('Введите свой комментарий')
    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
       if (nameError || emailError || commentError) {
           setFormValid(false)
       }
       else {
           setFormValid(true)
       }
    }, [nameError, emailError, commentError])

    const nameHandler = (e) => {
        setName(e.target.value)
        const reName =/^[a-z]{3,10}$/;

        if (!reName.test(String(name).toLowerCase())) {
            setNameError("Введите имя латинскими буквами. От 4 до 9 символов")
        } else {
            setNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reEmail.test(String(email).toLowerCase())) {
            setEmailError("Некорректный email")
        } else {
            setEmailError('')
        }
    }

    const commentHandler = (e) => {
        setBody(e.target.value)
        const reComment = /^[a-z0-9_-]{8,21}$/;

        if (!reComment.test(String(email).toLowerCase())) {
            setCommentError("Комментарий может содержать латингские буквы и цифры")
        } else {
            setCommentError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
            case "comment":
                setCommentDirty(true)
                break
        }
    }


    return (
        <form>
            <h1>Добавить комментарий</h1>
            <p>
                {(nameDirty && nameError) && <div style={{color: 'red'}}>{nameError}</div>}
                <MyInput
                    onChange={e => nameHandler(e)}
                    value={name}
                    onBlur={e => blurHandler(e)}
                    name='name'
                    type="text"
                    placeholder='Enter your name...'
                />
            </p>

            <p>
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                <MyInput
                    onChange={e => emailHandler(e)}
                    value={email}
                    onBlur={e => blurHandler(e)}
                    name='email'
                    type="text"
                    placeholder='Enter your email...'
                />
            </p>

           <p>
               {(commentDirty && commentError) && <div style={{color: 'red'}}> {commentError}</div>}
               <MyInput
                   onChange={e => commentHandler(e)}
                   value={body}
                   onBlur={e => blurHandler(e)}
                   name='comment'
                   type="text"
                   placeholder='Enter your comment...'
               />
           </p>

            <button disabled={!formValid} type='submit'>Отправить</button>

        </form>
    );
};

export default AddComment;