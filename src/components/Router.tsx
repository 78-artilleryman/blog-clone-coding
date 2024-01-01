import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'Pages/Home';
import PostList from 'Pages/posts';
import Detail from 'Pages/posts/Detail';
import PostNew from 'Pages/posts/PostNew';
import PostEdit from 'Pages/posts/PostEdit'
import ProfilePagefrom from 'Pages/profile'
import LoginPage from 'Pages/Login';
import SignupPage from 'Pages/signup';

interface RouterProps{
  isAuthenticated: boolean
}

function Router({isAuthenticated}: RouterProps) {
  
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/posts' element={<PostList/>}></Route>
            <Route path='/posts/:id' element={<Detail/>}></Route>
            <Route path='/posts/new' element={<PostNew/>}></Route>
            <Route path='/posts/edit/:id' element={<PostEdit/>}></Route>
            <Route path='/profile' element={<ProfilePagefrom/>}></Route>
            <Route path='*' element={<Navigate replace to="/"/>}></Route>
          </>
        ) : (
          <>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/signup' element={<SignupPage/>}></Route>
            <Route path='*' element={<LoginPage/>}></Route>
          </>
        )}
        
      </Routes>
   </>
  )
}

export default Router