import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

import './Register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^0\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLE_REGEX = /^(customer|rider|restaurant)$/;


const REGISTER_URL = 'http://127.0.0.1:8000/auth/';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [telephone_number, setTelNo] = useState('');
    const [validTelNo, setValidTelNo] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [fullname, setFullName] = useState('');

    const [role, setRole] = useState('');
    const [validRole, setValidRole] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setValidTelNo(PHONE_REGEX.test(telephone_number));
    }, [telephone_number])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidRole(ROLE_REGEX.test(role));
    }, [role])


    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd, telephone_number, email, role])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        const v3 = PHONE_REGEX.test(telephone_number);
        const v4 = EMAIL_REGEX.test(email);
        const v5 = ROLE_REGEX.test(role);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, password , telephone_number, email, fullname, role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
            setTelNo('');
            setEmail('');
            setFullName('');
            setRole('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="bg-gradient-to-b from-green-500 to-lime-500">
        <div>{success ? (
            <section class="bg-green-100 px-[8rem] py-[4rem]">
                <h1 class="text-green-900 text-3xl font-bold mb-4">Success!</h1>
                <p class="text-green-600">
                    <a href="/login" class="text-green-500 hover:text-green-600">Sign In</a>
                </p>
            </section>
        ) : (
            <div className="px-[16rem] py-[2rem]">
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className="text-slate-50 text-[2rem] font-medium text-center pb-2">Register</h1>
                    <form className="bg-slate-100 border-2 p-[1rem] rounded-lg" 
                    onSubmit={handleSubmit}>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="username" className="text-end w-[16rem] pr-[0.5rem]">
                                Username :
                                <FontAwesomeIcon icon={faCheck} className={ validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={username}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="password" className="text-end w-[16rem] pr-[0.5rem]">
                                Password :
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={password}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="confirm_pwd" className="text-end w-[16rem] pr-[0.5rem]">
                                Confirm Password :
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="telephone_number" className="text-end w-[16rem] pr-[0.5rem]">
                                Telephone number :
                                <FontAwesomeIcon icon={faCheck} className={validTelNo ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validTelNo || !telephone_number ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="text"
                                id="telephone_number"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setTelNo(e.target.value)}
                                value={telephone_number}
                                required
                                aria-invalid={validTelNo ? "false" : "true"}
                                aria-describedby="uidnote"
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="uidnote" className={ telephone_number && !validTelNo ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Just telno<br />
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="email" className="text-end w-[16rem] pr-[0.5rem]">
                                Email :
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="uidnote" className={ email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Just email<br />
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                        <label htmlFor="fullname" className="text-end w-[16rem] pr-[0.5rem]">
                            FullName :
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            className="w-full border-2 border-slate-300 shadow rounded"
                            type="text"
                            id="fullname"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullname}
                            required
                            aria-describedby="uidnote"
                        />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="uidnote" className={ fullname ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Just fullname<br />
                            </p>
                        </div>
                        <div className='text-[1.0rem] flex'>
                            <label htmlFor="role" className="text-end w-[16rem] pr-[0.5rem]">
                                Role :
                                <FontAwesomeIcon icon={faCheck} className={validRole ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validRole || !role ? "hide" : "invalid"} />
                            </label>
                            <input
                                className="w-full border-2 border-slate-300 shadow rounded"
                                type="text"
                                id="role"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                required
                                aria-invalid={validRole ? "false" : "true"}
                                aria-describedby="uidnote"
                            />
                        </div>
                        <div className="text-[0.9rem] pl-[13rem] my-[0.2rem]">
                            <p id="uidnote" className={ role && !validRole ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Just role<br />
                            </p>
                        </div>
                        <div className="flex justify-start">
                            <button className="text-[1.1rem] font-medium text-slate-50 bg-emerald-600 border-2 border-emerald-600 
                            hover:text-emerald-600 hover:bg-slate-100 hover:border-emerald-700 transition-all duration-300
                            rounded-md px-[1.5rem] py-[0.5rem]"
                            disabled={!validName || !validPwd || !validMatch || 
                            !validEmail || !validRole || !validTelNo  ? true : false}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="text-slate-100 text-[1.1rem] font-bold my-[0.5rem]">
                    Already registered?<br/>
                    <span className="line">
                        {/*put router link here*/}
                        <Link to={`/login`}>Sign In</Link>
                    </span>
                    </p>
                </section>
            </div>
        )}
    </div>
    </div>
    )
}

export default Register