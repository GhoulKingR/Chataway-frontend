import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    let username = useRef(null);
    let password = useRef(null);
    let signup = useRef(null);
    let nav = useNavigate();
    

    return ( <div className="flex flex-col justify-center h-full">
    <form method="post" className="flex flex-row justify-center" onSubmit={async (e) => {
            e.preventDefault();
            let obj = {
                username: username.current.value,
                password: password.current.value,
            }

            let res = await axios.post(process.env.REACT_APP_BACKEND + "/api/create", obj);
            if (res.data.return === 'created') {
                sessionStorage.setItem('user', JSON.stringify(obj));
                nav('/chats');
            } else {
                signup.current.value = "Already exists";
                setTimeout(() => {
                    signup.current.value = 'Signup';
                }, 5000);

            }
        }}>
            <div className="rounded border-sky-300 border-2 p-20">
                <input className="m-2 p-4 border-2 rounded border-slate-400 w-full" type="text" placeholder="Username..." ref={username} required/><br />
                <input className="m-2 p-4 border-2 rounded border-slate-400 w-full" type="password" placeholder="Password..." ref={password} required/><br />
                <input className="m-2 p-4 rounded border-white w-full bg-sky-400 hover:bg-sky-800 text-white" type="submit" value="Signup" ref={signup}/>
            </div>
        </form>
    </div> );
}

export default Signup;