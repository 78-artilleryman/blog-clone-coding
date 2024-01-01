import React from 'react'
import Profile from '../../components/Profile'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PostList from '../../components/PostList'


function ProfilePage() {
  return (
    <>
    <Header/>
    <PostList hasNavigation={false}/>
    <Footer/>
    </>
   
  )
}

export default ProfilePage