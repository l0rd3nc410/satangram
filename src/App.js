import './App.css';
import { useState, useEffect } from 'react';
import { database, auth } from './firebase';
import Header from './Header/Header';
import Post from './Post/Post';

function App() {

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        auth.onAuthStateChanged((val) => {
            if (val == null) return;
            setUser(val);
        });

        database.collection('posts').orderBy('uploadedAt', 'desc').onSnapshot((snapshot) => {
            setPosts(snapshot.docs.map((doc) => {
                return {
                    'id': doc.id,
                    'info': doc.data()
                }
            }));
        });
    });

    return (
        <div className="App">
            <Header user={user} setUser={setUser}></Header>
            {
                <div className="container container--flex container--posts">
                    {
                        posts.map((post) => {
                            return (
                                <Post key={post.id} user={user} postId={post.id} post={post.info}></Post>
                            )
                        })
                    }
                </div>
            }
        </div>
    );
}

export default App;
