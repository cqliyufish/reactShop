import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";

import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "components/cart-icon/cart-icon.component";
import CartDropdown from "components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";

import { signOutUser } from "utils/firebase/firebase.utils";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/user/user.selector";

import { selectIsCartOpen } from "store/cart/cart.selector";

import { signOutStart } from "store/user/user.action";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">Shop</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={() => dispatch(signOutStart())}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}

          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
