import axios from "axios";
import { useRef, useState } from "react";

function Chats() {
    let [contacts, setContacts] = useState(JSON.parse(sessionStorage.getItem('contacts')) || []);
    let [thisUser] = useState( JSON.parse( sessionStorage.getItem('user') ) || {} );
    let newContact = useRef();
    let [onChat, setOnChat] = useState(false);
    let [messages, changeMessages] = useState([]);
    let [contact, setContact] = useState("")
    let message = useRef();


    return (
    <>
        <ul style={{ display: !onChat ? 'block' : 'none' }}>
            <center>
                <li className="container border-b-2 border-slate-400 text-2xl p-5">
                    <form className="container" onSubmit={(e) => {
                        e.preventDefault();
                        let newInput = newContact.current.value;
                        if (newInput.trim().length > 0) {
                            let list = JSON.parse(sessionStorage.getItem('contacts')) || [];
                            list.push(newInput);
                            setContacts(list);
                            sessionStorage.setItem('contacts', JSON.stringify(list));
                            newContact.current.value = '';
                        }
                    }}>
                        <input type="text" placeholder="Add Contact..." ref={newContact}/>
                        <input className="rounded bg-sky-400 hover:bg-sky-800 text-white px-10 py-4" type="submit" value="Add" />
                    </form>
                </li>
                {
                    contacts.map((contact, i) => {
                        return <li key={i} className="cursor-pointer container border-b-2 border-slate-400 text-2xl p-5" onClick={async () => {
                            // move to messages
                            setOnChat(true);
                            setContact(contact);
                            let res = await axios.post(process.env.REACT_APP_BACKEND + "/api/chats", { users: [ thisUser['username'], contact ] })
                            changeMessages(res.data)
                        }}>
                            <div className="font-bold text-left">{contact}</div>
                        </li>
                    })
                }
            </center>
        </ul>
        <div style={{ display: onChat ? 'block' : 'none' }}>
            <div className="container p-5 border-b-2 border-slate-400"><button className="rounded bg-sky-400 hover:bg-sky-800 text-white px-10 py-4" onClick={() => setOnChat(false)}>Back</button></div>
            <div>
                {
                    messages.map((message, i) => {
                        let isUser = message['from'] === thisUser['username'];
                        return <div className="container flex justify-between py-3 px-10" key={i}>
                            { isUser && <div></div>}
                            <div className={"rounded w-fit p-2 " + (isUser ? 'bg-sky-400 text-white' : 'bg-slate-400')}>
                                {message['text']}
                            </div>
                            { !isUser && <div></div>}
                        </div>
                    })
                }
            </div>
            <div className="border-t-2 border-slate-400 fixed bottom-0 w-full">
                <form className="flex" onSubmit={async (e) => {
                    e.preventDefault();
                    let m_obj = {
                        users: [thisUser['username'], contact],
                        message: {
                            from: thisUser['username'],
                            text: message.current.value,
                        }
                    };
                    await axios.put(process.env.REACT_APP_BACKEND + "/api/send", m_obj);
                    changeMessages([...messages, m_obj.message]);
                    message.current.value = '';
                }}>
                    <input className="p-5 flex-grow" type="text" placeholder="Write message..." ref={message} />
                    <input className="p-5 flex-1 bg-sky-400 hover:bg-sky-900 text-white font-bold text-xl" type="submit" value="Send" />
                </form>
            </div>
        </div>
    </>);
}

export default Chats;