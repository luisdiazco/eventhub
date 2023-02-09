import React from 'react';
import LoginScreen from '../screens/Login';
import { fireEvent, waitFor } from '@testing-library/react-native';
import {expect, jest} from '@jest/globals';
import { loginForm } from '../utils/login.form';
import { store } from '../store/store';
import { recoverPassword, recoverPasswordReset, recoverPasswordSuccess } from '../store/login/login.actions';

describe("Login screen", () => {
    it("should go to the register page on register", () => {
        const navigation = {navigate: () => {}}
        jest.spyOn(navigation, 'navigate');

        const page = renderLoginScreen(navigation);

    const registerButton = page.getByTestId("registerButton");

    fireEvent.press(registerButton);

    expect(navigation.navigate).toHaveBeenCalledWith("Register");
  });

  it("should be invalid if email is empty", () => {
    const formValues = { email: "" };

    expect(loginForm.isValidSync(formValues)).toBeFalsy();
  });

  it("should be invalid if email is invalid", () => {
    const formValues = { email: "invalid" };

    expect(loginForm.isValidSync(formValues)).toBeFalsy();
  });

  it("should be invalid if password if empty", () => {
    const formValues = { password: "", email: "valid@email.com" };

    expect(loginForm.isValidSync(formValues)).toBeFalsy();
  });

  it("form should be valid", () => {
    const formValues = { password: "validPassword", email: "valid@email.com" };

    expect(loginForm.isValidSync(formValues)).toBeTruthy();
  });

    it("should show an error message if email touched and is empty", async () => {
        const page = renderLoginScreen();

    const email = page.getByTestId("email");
    fireEvent.changeText(email, "");

    const loginButton = page.getByTestId("loginButton");
    fireEvent.press(loginButton);

    await waitFor(() => page.getByTestId("error-email"));
  });

    it("should hide error message if email is not touched", async () => {
        const page = renderLoginScreen();

    await waitFor(() =>
      expect(page.queryAllByTestId("error-email").length).toEqual(0)
    );
  });

    it("should show an error message if password is touched and is empty", async () => {
        const page = renderLoginScreen();

        const password = page.getByTestId("password");
        fireEvent.changeText(password, "");

    const loginButton = page.getByTestId("loginButton");
    fireEvent.press(loginButton);

    await waitFor(() => page.getByTestId("error-password"));
  });

    it("should hide error message if password is not touched", async () => {
        const page = renderLoginScreen();

    await waitFor(() =>
      expect(page.queryAllByTestId("error-password").length).toEqual(0)
    );
  });

    it("should disable recovery button if email is empty", async () => {
        const page = renderLoginScreen();

    const recoveryButton = page.getByTestId("recoveryButton");

    await waitFor(() =>
      expect(recoveryButton.props.accessibilityState.disabled).toBeTruthy()
    );
  });

    it("should disable recovery button if email has error", async () => {
        const page = renderLoginScreen()

    const email = page.getByTestId("email");
    fireEvent.changeText(email, "invalid");

    const recoveryButton = page.getByTestId("recoveryButton");

        await waitFor(() => expect(recoveryButton.props.accessibilityState.disabled).toBeTruthy());
    })

    it("should show loading component and recover password on the forget email/password", () => {
        const screen = renderLoginScreen()
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, 'valid@email.com');
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton');
        fireEvent.press(forgotEmailPasswordButton);

        expect(store.getState().login.isRecoveringPassword).toBeTruthy();
        expect(store.getState().loading.show).toBeTruthy();
    })

    it("should hide loading and show success message when has recovered password", async () => {
        const screen = renderLoginScreen()
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, 'valid@email.com');
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton');
        fireEvent.press(forgotEmailPasswordButton);

        await waitFor(() => {
            expect(store.getState().login.isRecoveringPassword).toBeTruthy();
            expect(store.getState().loading.show).toBeFalsy();
            screen.getByTestId('recoverPasswordSuccess');
        })
        
    })

    it("should hide success message when recover password is false", () => {
        const screen = renderLoginScreen();
        
        store.dispatch(recoverPassword());
        store.dispatch(recoverPasswordSuccess());
        store.dispatch(recoverPasswordReset());

        expect(screen.queryAllByTestId('recoverPasswordSuccess').length).toEqual(0);
    })

    it("should hide loading and show error message when has recovered password with error", async () => {
        const screen = renderLoginScreen()
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, 'error@email.com');
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton');
        fireEvent.press(forgotEmailPasswordButton);

        await waitFor(() => {
            expect(store.getState().login.isRecoveringPassword).toBeFalsy();
            expect(store.getState().loading.show).toBeFalsy();
            expect(store.getState().loading.error).not.toBeNull();
            screen.getByTestId('errorMessage');
        })
        
    })

    it("should hide success message when there is no error", () => {
        const screen = renderLoginScreen();
        
        store.dispatch(recoverPassword());
        store.dispatch(recoverPasswordFail({error: 'message'}));
        store.dispatch(recoverPasswordReset());

        expect(screen.queryAllByTestId('errorMessage').length).toEqual(0);
    })

    it("should show loading start login when user tries to login", async () => {
        const screen = renderLoginScreen();
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, "valid@email.com");
        const password = screen.getByTestId('password');
        fireEvent.changeText(password, 'anyPassword');
        const loginButton = screen.getByTestId('loginButton');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(store.getState().login.isLoggingIn).toBeTruthy();
            expect(store.getState().loading.show).toBeTruthy();    
        })
        
    })

    it ("should hide loading and redirect to map screen when login is successful", async () => {
        const navigation = {navigate: () => {}};
        spyOn(navigation, 'navigate');
        
        const screen = renderLoginScreen(navigation);
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, "valid@email.com");
        const password = screen.getByTestId('password');
        fireEvent.changeText(password, 'anyPassword');
        const loginButton = screen.getByTestId('loginButton');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(store.getState().login.isLoggedIn).toBeTruthy();
            expect(store.getState().loading.show).toBeFalsy();
            expect(navigation.navigate).toHaveBeenCalledWith("Map"); 
        })
    })

    it ("should hide loading and show error message when login fails", async () => {
        const screen = renderLoginScreen();
        const email = screen.getByTestId('email');
        fireEvent.changeText(email, "error@email.com");
        const password = screen.getByTestId('password');
        fireEvent.changeText(password, 'anyPassword');
        const loginButton = screen.getByTestId('loginButton');
        fireEvent.press(loginButton);

        await waitFor(() => {
            expect(store.getState().login.isLoggingIn).toBeFalsy();
            expect(store.getState().loading.show).toBeFalsy();
            screen.getByTestId('errorMessage'); 
        })
    })

    function renderLoginScreen(navigation){
        return <Provider store={store}><LoginScreen navigation={navigation}/></Provider>;
    }
})