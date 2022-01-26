import { useRef } from "react";
import axios from 'axios'
import { Link,  useNavigate } from "react-router-dom";

function Login() {
    let username = useRef(null);
    let password = useRef(null);
    let login = useRef(null);
    let nav = useNavigate();

    return ( <div className="flex flex-col justify-center h-full">
        <form method="post" className="flex flex-row justify-center" onSubmit={async (e) => {
            e.preventDefault();
            let obj = {
                username: username.current.value,
                password: password.current.value,
            }

            let res = await axios.post(process.env.REACT_APP_BACKEND + "/api/login", obj);
            if ( 'correct' === res.data.return) {
                sessionStorage.setItem('user', JSON.stringify(obj));
                nav('/chats');
            } else {
                login.current.value = "incorrect username or password"
                setTimeout(() => {
                    login.current.value = 'Login'
                }, 2000);

            }
        }}>
            <div className="rounded border-sky-300 border-2 p-20">
                <div>
                    <input className="m-2 p-4 border-2 rounded border-slate-400 w-full" type="text" placeholder="Username..." ref={username} required/><br />
                    <input className="m-2 p-4 border-2 rounded border-slate-400 w-full" type="password" placeholder="Password..." ref={password} required/><br />
                    <input className="m-2 p-4 rounded border-white w-full bg-sky-400 hover:bg-sky-800 text-white" type="submit" value="Login" ref={login} />
                </div>
                <div className="text-sm mt-3">Don't have an account? <Link to="/signup" className="text-sky-400 underline">sign up</Link> </div>
            </div>
        </form>
    </div> );
}

export default Login;