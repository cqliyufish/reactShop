import FormInput from "components/form-input/form-input.component";
import { useState, FormEvent, ChangeEvent } from "react";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "components/button/button.component";

import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "store/user/user.action";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defualtFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defualtFormFields);
  const { email, password } = formFields;

  ////////////////////////////////////////////////////////////////   google sign in  ////////////////////////////////////////////////////////////////

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  ////////////////////////////////////////////////////////////////   input框中显示输入文字  ////////////////////////////////////////////////////////////////
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // [name] 属性赋值， 对象key不固定，不能用.
    setFormFields({ ...formFields, [name]: value });
  };
  ////////////////////////////////////////////////////////////////   input框中清空  ////////////////////////////////////////////////////////////////
  const resetFormFields = () => {
    setFormFields(defualtFormFields);
  };

  ////////////////////////////////////////////////////////////////   提交表格  ////////////////////////////////////////////////////////////////

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      console.log("user sign in failed", error);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={logGoogleUser}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
