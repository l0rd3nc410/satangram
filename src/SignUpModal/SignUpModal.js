import "./SignUpModal.css";
import { auth } from '../firebase.js';

function closeModal() {
    let modal = document.getElementById('signUpModal');
    modal.style.display = 'none';
}

/**
 * @param {Event} event 
 */
function sellASoul(event) {
    event.preventDefault();

    let username = document.getElementById('signUpUsername').value;
    let email = document.getElementById('signUpEmail').value;
    let pass = document.getElementById('signUpPass').value;
    let passConfirmation = document.getElementById('signUpPassConfirmation').value;

    if (pass !== passConfirmation) { return; }
    auth.createUserWithEmailAndPassword(email, pass)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            });
            closeModal();
        })
        .catch((error) => {
            console.error(error);
        });

}

function SignUpModal() {
    return (
        <div id="signUpModal" className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__form">
                <div className="button__wrapper button__wrapper--signup">
                    <button className="form__button modal__close" onClick={() => closeModal()}>X</button>
                </div>
                <div className="greetings">
                    <h2 className="greetings__title">Welcome Mortal</h2>
                    <p className="greetings__text">Enter your information below to sell your soul and gain access to our sanctuary</p>
                </div>
                <form className="signupForm" onSubmit={(e) => sellASoul(e)}>
                    <label htmlFor="signUpUsername" className="form__label form__label--signup">
                        <span className="form__labelText form__labelText--signup">Username</span>
                        <input id="signUpUsername" className="form__field form__field--signup" type="text" placeholder="Username" />
                    </label>
                    <label htmlFor="signUpEmail" className="form__label form__label--signup">
                        <span className="form__labelText form__labelText--signup">Email</span>
                        <input id="signUpEmail" className="form__field form__field--signup" type="text" placeholder="Email" />
                    </label>
                    <label htmlFor="signUpPass" className="form__label form__label--signup">
                        <span className="form__labelText form__labelText--signup">Password</span>
                        <input id="signUpPass" className="form__field form__field--signup" type="password" placeholder="Enter Password" />
                    </label>
                    <label htmlFor="signUpPassConfirmation" className="form__label form__label--signup">
                        <span className="form__labelText form__labelText--signup">Confirm Password</span>
                        <input id="signUpPassConfirmation" className="form__field form__field--signup" type="password" placeholder="Confirm Password" />
                    </label>
                    <div className="button__wrapper">
                        <button className="form__button form__button--signup">Sell Soul</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUpModal;
