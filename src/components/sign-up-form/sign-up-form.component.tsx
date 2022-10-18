import FormInput from "components/form-input/form-input.component";
import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import Button from "components/button/button.component";
import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart } from "store/user/user.action";
import { useDispatch } from "react-redux";

const defualtFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  ////////////////////////////////////////////////////////////////   input框中显示输入文字  ////////////////////////////////////////////////////////////////
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    //阻止页面跳转
    event.preventDefault();

    //check password
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      //clear form
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <SignUpContainer>
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

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
