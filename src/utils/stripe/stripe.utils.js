import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  // 创建.env文件，存储key。将.env加到gitigonore
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);
