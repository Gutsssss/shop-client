import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  
  const isLogin = location.pathname === '/login';
  const formTitle = isLogin ? 'Login' : 'Registration';
  const switchButtonText = isLogin ? 'Need an account? Register' : 'Already have an account? Login';
  const submitButtonText = isLogin ? 'Login' : 'Register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      navigate('/Home');
    } catch (err:string | unknown) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex gap-4 flex-column align-items-center w-full md:w-30rem p-4 shadow-2 border-round-xl"
    >
      <h1 className="text-4xl m-2">{formTitle}</h1>
      
      {error && (
        <div className="w-full p-3 border-round bg-red-100 text-red-700">
          {error}
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
          feedback={!isLogin}
          toggleMask
          className="w-full"
          required
          inputClassName="w-full"
        />
        <label htmlFor="password">Password</label>
      </FloatLabel>

      <div className="flex w-full justify-content-between align-items-center">
        <NavLink 
          to={isLogin ? "/registration" : "/login"}
          className="text-primary-500 hover:text-primary-700 transition-colors"
        >
          {switchButtonText}
        </NavLink>

        <Button 
          type="submit" 
          label={submitButtonText}
          loading={loading}
          className={classNames({
            'p-button-success': !isLogin,
            'p-button-primary': isLogin
          })}
        />
      </div>

      {!isLogin && (
        <div className="text-sm text-500 mt-2">
          Password must contain at least 8 characters, one uppercase letter and one number
        </div>
      )}
    </form>
  );
};