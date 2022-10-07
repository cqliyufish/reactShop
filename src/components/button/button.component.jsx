/*
1. 3种button
defualt、sign in， reverted

*/

import "./button.styles.scss";

//根据不同的button，选择不同的class
const BUTTON_TYPE_CLASSE = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSE[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
