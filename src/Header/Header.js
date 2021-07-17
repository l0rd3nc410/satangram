import "./Header.css";
import SignUpModal from '../SignUpModal/SignUpModal'
import SacrificeModal from '../SacrificeModal/SacrificeModal'
import { auth } from '../firebase.js';

function Header(props) {

    /**
     * @param {Event} event 
     */
    function openSignUpModal(event) {
        event.preventDefault();
        let modal = document.getElementById('signUpModal');
        modal.style.display = 'block';
    }

    /**
   * @param {Event} event 
   */
    function openSacrificeModal(event) {
        event.preventDefault();
        let modal = document.getElementById('sacrificeModal');
        modal.style.display = 'block';
    }

    /**
     * @param {Event} event 
     */
    function signInUser(event) {
        event.preventDefault();
        let email = document.getElementById('username').value;
        let pass = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, pass)
            .then((cred) => {
                props.setUser(cred.user.displayName);
                window.location.href = '/';
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function signOutUser(event) {
        event.preventDefault();
        auth.signOut().then(() => {
            props.setUser(null);
            window.location.href = '/';
        });

    }

    return (
        <div>
            <SignUpModal></SignUpModal>
            <SacrificeModal username={props.user.displayName}></SacrificeModal>
            <div className="header">
                <div className="container container--header">
                    <div className="header__logo">
                        <h2 className="header__label">Satangram</h2>
                    </div>
                    {
                        (props.user) ?
                            <div>
                                <div className="user__info">
                                    <span className="user__username">Olá, <b>{props.user.displayName}</b></span>
                                    <div className="user__actions">
                                        <button className="form__button form__button--post" onClick={(e) => openSacrificeModal(e)}>Make a Sacrife</button>
                                        <button className="form__button form__button--signout" onClick={(e) => signOutUser(e)}>Sign Out</button>
                                    </div>
                                </div>
                            </div> :

                            <div>
                                <div className="header__signinForm">
                                    <form className="signinForm" onSubmit={(e) => signInUser(e)}>
                                        <label className="form__label" htmlFor="username">
                                            <input className="form__field" id="username" type="text" placeholder="Username" />
                                        </label>
                                        <label className="form__label" htmlFor="password">
                                            <input className="form__field" id="password" type="password" placeholder="Password" />
                                        </label>
                                        <button className="form__button form__button--signin" type="submit" name="send">Sign In</button>
                                    </form>
                                    <div className="button__wrapper">
                                        <button className="button__signup" onClick={(e) => openSignUpModal(e)}>Sell Your Soul</button>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;