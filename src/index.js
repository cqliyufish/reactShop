import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "utils/stripe/stripe.utils";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Router>
          {/* allow <App /> access to stripe */}
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </Router>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

reportWebVitals();
