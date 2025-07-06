import { LoginForm } from "../../LoginForm/LoginForm"

export const RegistrationPage = () =>{ 
    return (
        <div className="m-auto flex justify-content-center align-items-center" style={{height:window.innerHeight - 50}}>
            <LoginForm/>
        </div>
    )
}