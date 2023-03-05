import React, { useState } from "react"
import axios from 'axios';


let EmailValid: boolean = false;
let PasswordValid: boolean = false;
let CheckPasswordValid: boolean = false;


export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [chekcPassword, setCheckPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      const response = await axios.post("/api/user/signup", {username, email, password});
      console.log(response.data);
    }catch(err: any){
      console.log(err.message);
    }
  }

  /**
   * 이메일 형식인지 검사하는 함수
   * @param email 이메일 : string
   * @returns 
   */
  const handleEmail = (email : string) => {
    setEmail(email);
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError('이메일 형식이 아닙니다');
      EmailValid = false;
      return
    }
    EmailValid = true;
    setError(null);
    return
  }

  /**
   * 비밀번호 형식 감시 함수
   * @param password 패스워드 : string
   * @returns 
   */
  const handlePassword = (password: string) => {
    setPassword(password);
    if(password.length < 8){
      setError('비밀번호는 8자리 이상이어야 합니다');
      PasswordValid = false;
      return;
    }
    setError(null);
    PasswordValid = true;
  }

  /**
   * 비밀번호 검사하는 함수
   * @param checkPassword 패스워드 : string
   * @returns 
   */
  const handleCheckPassword = (checkPassword: string) => {
    setCheckPassword(checkPassword);
    if(password != checkPassword){
      setError('비밀번호가 일치하지 않습니다');
      CheckPasswordValid = false;
      return;
    }
    setError(null);
    CheckPasswordValid = true;
  }

  const isSubmitDisabled = !EmailValid || !PasswordValid || !CheckPasswordValid || !(username.length > 0)

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center font-bold"> 회원가입 </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input value={username} onChange={(event) => setUsername(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input value={email} onChange={(event) => handleEmail(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input value={password} onChange={(event) => handlePassword(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="checkpassword">
                Check Password
              </label>
              <input value={chekcPassword} onChange={(event) => handleCheckPassword(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="checkpassword" type="password" placeholder="Password"/>
            </div>
            {error && <div className="text-xs text-red-600 mb-2 text-center">{error}</div>}
            <div className="flex items-center">
              <button disabled={isSubmitDisabled} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}