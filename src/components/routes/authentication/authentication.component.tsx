import SignUpForm from "components/sign-up-form/sign-up-form.component";
import SignInForm from "components/sign-in-form/sign-in-form.component";

import { AuthenticationContainer } from "./authentication.styles";
////////////////////////////////////////////////////////////////////  popup login ////////////////////////////////////////////////////////////

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

////////////////////////////////////////////////////////////////////  redirect login ////////////////////////////////////////////////////////////

// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

// import {
//   auth,
//   createUserDocumentFromAuth,
//   signInWithGoogleRedirect,
// } from "utils/firebase/firebase.utils";

// const Authentication = () => {
//   // get redirect result from auth when come back from google login
//   useEffect(() => {
//     const getDate = async () => {
//       const response = await getRedirectResult(auth);
//       if (response) {
//         //create data in database
//         const userDocRef = createUserDocumentFromAuth(response.user);
//       }
//     };
//     getDate();
//   }, []);

//   return (
//     <div>
//       <h1>signin</h1>
//       <button onClick={signInWithGoogleRedirect}>
//         Sign in with Google Redirect
//       </button>
//     </div>
//   );
// };

// export default Authentication;
