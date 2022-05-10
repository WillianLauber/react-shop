import { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(formFields);
    const { email, password } = formFields;
    try {
      signInUserWithEmailAndPassword();
      resetFormFields();
      document.getElementByClassName("sign-up-form").reset();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
      }
    }
  };

  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  return (
    <div className="sign-ip-form sing-ip-container">
      <h2>Already have an account?</h2>
      <h1>Sign in with email and password</h1>
      <form>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          required
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          required
        ></FormInput>
        <div>
          <Button type="action" onClick={handleSubmit}>
            Sign-in
          </Button>

          <Button
            type="action"
            buttonType="google"
            onClick={SignInWithGoogle()}
          >
            Google sign-in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
