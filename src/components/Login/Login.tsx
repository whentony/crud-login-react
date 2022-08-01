import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from '../../contexts/Auth';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMensageError] = useState('');
    const { signIn } = useContext(AuthContext);
    const handleSignIn = (e: any) => {
        e.preventDefault()
        signIn(email, password).then(res => {
            console.log(res)
            if (res.code === "ERR_BAD_REQUEST") {
                setMensageError('Usuário ou senha incorretos')
            } else {
                navigate("/table", { replace: true });
            }
        })

    }

    return (
        <>
            <div className="text-center container h-100 d-flex align-items-center justify-content-center ">
                <div className="align-middle">
                    <form className="form-signin" onSubmit={(e) => handleSignIn(e)}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email address" required autofocus="" />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} id="inputPassword" className="form-control" placeholder="Password" required />
                        <div>
                            <label className="text-danger">{messageError}</label>
                        </div>

                        <button className="btn btn-lg mt-2 btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">© 2022</p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Login;