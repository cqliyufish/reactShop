import FormInput from "components/form-input/form-input.component";
import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "utils/firebase/firebase.utils.js";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "components/button/button.component";
import "./sign-in-form.styles.scss";

const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;

  ////////////////////////////////////////////////////////////////   google sign in  ////////////////////////////////////////////////////////////////

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
  };

  ////////////////////////////////////////////////////////////////   input框中显示输入文字  ////////////////////////////////////////////////////////////////
  const handleChange = (event) => {
    const { name, value } = event.target;
    // [name] 属性赋值， 对象key不固定，不能用.
    setFormFields({ ...formFields, [name]: value });
  };
  ////////////////////////////////////////////////////////////////   input框中清空  ////////////////////////////////////////////////////////////////
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  ////////////////////////////////////////////////////////////////   提交表格  ////////////////////////////////////////////////////////////////

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("incorrect email ");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
