import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {app} from "firebaseApp"
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] =  useState<string>("");
  const [passwordConfirm, setPasswordConfirm] =  useState<string>("");
  const [error, setErorr] = useState<string>("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공했습니다.")
      navigate("/login");
    }catch(error:any){
      console.log(error)
      toast.error(error?.code)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target : {name, value}
    } = e;

    if(name === 'email'){
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


      if(!value?.match(validRegex)){
        setErorr("이메일 형식이 올바르지 않습니다.")
      }
      else{
        setErorr("")
      }
    }
    if(name === 'password'){
      setPassword(value);
      if(value?.length < 8){
        setErorr("비밀번호는 8자리 이상으로 입력해주세요")
      }
      else if(passwordConfirm?.length > 0 && value !== passwordConfirm){
        setErorr("비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.")
      }
      else{
        setErorr("")
      }
    }
    if(name === 'password_confirm'){
      setPasswordConfirm(value);
      if(value?.length < 8){
        setErorr("비밀번호는 8자리 이상으로 입력해주세요")
      }
      else if(value !== password){
        setErorr("비밀번호와 값이 다릅니다. 다시 확인해주세요.")
      }
      else{
        setErorr("")
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className='form form--lg'>
        <h1 className='form_title'>회원가입</h1>
        <div className='form_block'>
          <label htmlFor="email">이메일</label>
          <input type="text" name='email' id='title' required  onChange={onChange} value={email}/>
        </div>
        <div className='form_block'>
          <label htmlFor="password">비밀번호</label>
          <input type="text" name='password' id='password' required  onChange={onChange} value={password}/>
        </div>
        <div className='form_block'>
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input type="text" name='password_confirm' id='password_confirm' required  onChange={onChange} value={passwordConfirm} />
        </div>
        {error && error?.length > 0 && (
          <div className='form_block'>
            <div className="form_error">{error}</div>
          </div>
        )}
       <div className='form_block'>
          게정이 이미 있으신가요? 
          <Link to="/login" className='form_link'>
            로그인하기
          </Link> 
        </div>
        <div className='form_block'>
          <input type="submit" value="회원가입" className='form_btn_submit' disabled={error?.length > 0}/>
        </div>
      </form>
    </>
  )
}

export default SignupForm