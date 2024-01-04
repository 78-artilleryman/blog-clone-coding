import React from 'react'
import Profile from '../../components/Profile'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PostList from '../../components/PostList'


function ProfilePage() {
  return (
    <>
    <Header/>
    <Profile></Profile>
    <PostList hasNavigation={false} defaultTab='my'/>
    <Footer/>
    </>
   
  )
}

export default ProfilePage