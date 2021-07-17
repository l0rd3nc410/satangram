import "./SacrificeModal.css";
import { useState } from "react";
import firebase from "firebase";
import { database, storage } from '../firebase.js';


function closeModal() {
    let modal = document.getElementById('sacrificeModal');
    modal.style.display = 'none';
}

function SacrificeModal(props) {

    const [sacrificeProgress, setSacrificeProgress] = useState(0);
    const [file, setFile] = useState('');

    /**
     * @param {Event} event 
     */
    function submitSacrifice(event) {
        event.preventDefault();
        let title = document.getElementById('sacrificeTitle').value;

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setSacrificeProgress(progress);
        }, (err) => {

        }, () => {
            storage.ref('images').child(file.name).getDownloadURL()
                .then((url) => {
                    database.collection('posts').add({
                        'title': title,
                        'image': url,
                        'username': props.username,
                        'uploadedAt': firebase.firestore.FieldValue.serverTimestamp()
                    });

                    setSacrificeProgress(0);
                    setFile(null);
                    
                    document.getElementById('sacrificeForm').reset();
                    closeModal();
                });
        });

    }

    return (
        <div id="sacrificeModal" className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__form">
                <div className="button__wrapper button__wrapper--sacrifice">
                    <button className="form__button modal__close" onClick={() => closeModal()}>X</button>
                </div>
                <div className="greetings">
                    <h2 className="greetings__title">Sacrifice</h2>
                    <p className="greetings__text">Satan need your sacrifice, please insert an image below to make Santan happy</p>
                </div>
                <form id="sacrificeForm" className="sacrificeForm" onSubmit={(e) => submitSacrifice(e)}>
                    <label htmlFor="sacrificeProgress" className="form__label form__label--sacrifice">
                        <progress id="sacrificeProgress" className="sacrificeForm__progress" value={sacrificeProgress}></progress>
                    </label>

                    <label htmlFor="sacrificeTitle" className="form__label form__label--sacrifice">
                        <span className="form__labelText form__labelText--sacrifice">Title</span>
                        <input id="sacrificeTitle" className="form__field form__field--sacrifice" type="text" placeholder="My awesome title" />
                    </label>

                    <label htmlFor="sacrificeImage" className="form__label form__label--sacrifice">
                        <span className="form__labelText form__labelText--sacrifice">Image</span>
                        <input id="sacrificeImage" className="form__field form__field--sacrifice" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                    <div className="button__wrapper">
                        <button className="form__button form__button--sacrifice">Sacrifice</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SacrificeModal;