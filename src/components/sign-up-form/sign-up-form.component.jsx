import FormInput from "components/form-input/form-input.component";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "utils/firebase/firebase.utils.js";

import Button from "components/button/button.component";
import "./sign-up-form.styles.scss";

const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  ////////////////////////////////////////////////////////////////   input框中显示输入文字  ////////////////////////////////////////////////////////////////
  const handleChange = (event) => {
    const { name, value } = event.target;
    // [name] 属性赋值， 对象key不固定，不能用.
    // console.log(displayName);
    setFormFields({ ...formFields, [name]: value });
  };
  ////////////////////////////////////////////////////////////////   input框中清空  ////////////////////////////////////////////////////////////////
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  ////////////////////////////////////////////////////////////////   提交表格  ////////////////////////////////////////////////////////////////

  const handleSubmit = async (event) => {
    //阻止页面跳转
    event.preventDefault();

    //check password
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      //利用email, password create userAuth
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      //创建user doc reference
      await createUserDocumentFromAuth(user, { displayName });

      //clear form
      resetFormFields();
    } catch (error) {
      console.log("creating user error: ", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          value={displayName}
          name="displayName"
          onChange={handleChange}
        />

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

        <FormInput
          label="Comfirm Password"
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        <Button buttonType="inverted" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
