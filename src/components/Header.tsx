
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom'
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Header() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsAuthenticated(true);
      }
      else{
        setIsAuthenticated(false);
      }
    })
  },[auth])
  return (
    <>
       <header className='header'>

        <Link to='/' className='header__logo'>Blog</Link>
          {isAuthenticated ? (
          <div>
            <Link to='/posts/new'>글쓰기</Link>
            <Link to='/posts'>게시글</Link>
            <Link to='/profile'>프로필</Link>
         
          </div>
          ) : (
            <div>
              <Link to='/login'>로그인</Link>
              <Link to='/signup'>회원가입</Link>
            </div>
          )}
      </header>
    </>
  )
}

export default Header