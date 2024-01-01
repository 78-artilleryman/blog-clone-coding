import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {app} from "firebaseApp"
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from 'react-toastify';

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] =  useState<string>("");
  const [error, setErorr] = useState<string>("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("로그인에 성공했습니다.")
      navigate("/");
    }catch(error: any){
      toast.error(error?.code);
      console.log(error)
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
      else{
        setErorr("")
      }
    }
  }

  
  return (
    <>
      <form onSubmit={onSubmit} className='form form--lg'>
        <h1 className='form_title'>로그인</h1>
        <div className='form_block'>
          <label htmlFor="email">이메일</label>
          <input type="text" name='email' id='email' required onChange={onChange} value={email}/>
        </div>
        <div className='form_block'>
          <label htmlFor="password">비밀번호</label>
          <input type="text" name='password' id='password' required onChange={onChange} value={password}/>
        </div>
        {error && error?.length > 0 && (
          <div className='form_block'>
            <div className="form_error">{error}</div>
          </div>
        )}
        <div className='form_block'>
          게정이 없으신가요? 
          <Link to="/signup" className='form_link'>
            회원가입하기
          </Link>
        </div>
        <div className='form_block'>
          <input type="submit" value="로그인" className='form_btn_submit' disabled={error?.length > 0}/>
        </div>
      </form>
    </>
  )
}

export default LoginForm