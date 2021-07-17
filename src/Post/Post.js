import './Post.css';
import React from 'react';
import firebase from "firebase";
import { useState, useEffect } from 'react';
import { database } from '../firebase.js';

function Post(props) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        database.collection('posts').doc(props.postId).collection('comments').orderBy('uploadedAt', 'desc').onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => {
                return { 'id': doc.id, 'info': doc.data() }
            }));
        });
    })

    /**
     * Send a comment to database
     * @param {Event} e 
     */
    function praiseSatan(e, index) {
        e.preventDefault();

        let content = document.getElementById('newComment' + index).value;
        database.collection('posts').doc(index).collection('comments').add(
            {
                'username': props.user.displayName,
                'content': content,
                'uploadedAt': firebase.firestore.FieldValue.serverTimestamp()
            }
        ).then(() => {
            document.getElementById('praiseSatan').reset();
        });
    }

    return (
        <div key={props.postId} className="post__imageCard">
            <div className="post__imageHeader">
                <div className="imageHeader__imageTitle">
                    <span>{props.post.title}</span>
                </div>
                <div className="imageHeader__username">
                    <span>Uploaded by: <b>{props.post.username}</b></span>
                </div>
            </div>
            <div className="post__image" style={{ backgroundImage: `url(${props.post.image})` }}></div>
            <div className="post__comments">
                <div className="comments">
                    {
                        comments.map((comment, index) => {
                            return (
                                <div key={index} className="comment">
                                    <p className="comment__content" comment-content={comment.info.content}>{comment.info.username}:&nbsp;</p>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    (props.user) ?
                        <form id="praiseSatan" className="comments__create" onSubmit={(e) => praiseSatan(e, props.postId)}>
                            <label className="form__label" htmlFor={"newComment" + props.postId}>
                                <textarea className="form__field form__field--textarea" name="newComment" id={"newComment" + props.postId} ></textarea>
                            </label>
                            <div className="button__wrapper">
                                <button className="form__button form__button--comment">Comment</button>
                            </div>
                        </form>
                        :
                        null
                }
            </div>
        </div>
    )

}

export default Post;