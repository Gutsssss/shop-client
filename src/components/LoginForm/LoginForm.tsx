import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login, registration } from "../../store/reducers/ActionCreators";

type FormTypes = 'login' | 'register'
type FormTextFields = {
  formTitle: string;
  switchButtonText: string;
  submitButtonText: string
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const {isLoading,error} = useAppSelector(state => state.userReducer)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLoginPath = location.pathname === '/login' || '/Login';
  const formTexts: Record<FormTypes, FormTextFields> = {
  login: {
    formTitle: 'Login',
    switchButtonText: 'Need an account? Register',
    submitButtonText: 'Login'
  },
  register: {
    formTitle: 'Registration',
    switchButtonText: 'You already have an account? Log in',
    submitButtonText: 'Registration'
  } 
};
  const formType: FormTypes = isLoginPath ? 'login' : 'register'
const {formTitle, submitButtonText, switchButtonText} = formTexts[formType]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(isLoginPath) {
        await dispatch(login(email,password))
      navigate('/catalog')
      }
      else {
        await dispatch(registration(email,password))
      }
    } catch (err:string | unknown) {
      console.log(err)
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex gap-4 flex-column align-items-center w-full md:w-30rem p-4 shadow-2 border-round-xl"
    >
      <h1 className="text-4xl m-2">{formTitle}</h1>
      
      {error as string && (
        <div className="w-full p-3 border-round bg-red-100 text-red-700">
          {error as string}
        </div>
      )}

      <FloatLabel className="w-full">
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          keyfilter="email"
          className="w-full"
          required
          type="email"
        />
        <label htmlFor="email">Email</label>
      </FloatLabel>

      <FloatLabel className="w-full">
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={!isLoginPath}
          toggleMask
          className="w-full"
          required
          inputClassName="w-full"
        />
        <label htmlFor="password">Password</label>
      </FloatLabel>

      <div className="flex w-full justify-content-between align-items-center">
        <NavLink 
          to={isLoginPath ? "/registration" : "/login"}
          className="text-primary-500 hover:text-primary-700 transition-colors"
        >
          {switchButtonText}
        </NavLink>

        <Button 
          type="submit" 
          label={submitButtonText}
          loading={isLoading}
          className={classNames({
            'p-button-success': !isLoginPath,
            'p-button-primary': isLoginPath
          })}
        />
      </div>

      {!isLoginPath && (
        <div className="text-sm text-500 mt-2">
          Password must contain at least 8 characters, one uppercase letter and one number
        </div>
      )}
    </form>
  );
};