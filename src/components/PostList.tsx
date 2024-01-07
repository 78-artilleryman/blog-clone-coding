import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {collection, deleteDoc, doc, getDocs, orderBy, query, where} from "firebase/firestore"
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface PostListProps{
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface CommentInterfate{
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}



export interface PostProps{
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentInterfate[];
}
type TabType = "all" | "my"; 

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend", 
  "Backend" ,
  "Web" ,
  "Native"
]

function PostList({hasNavigation = true, defaultTab = "all"} : PostListProps) {
  const [activeTap, setActiveTab] = useState<TabType | CategoryType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const {user} = useContext(AuthContext)

  const getPosts = async () => {
   

    setPosts([]);

    let postRef = collection(db, "posts");
    let postQuery;

    if(activeTap === "my" && user){
      //나의 글만 필터링
      postQuery = query(
        postRef, 
        where('uid', "==", user.uid),
        orderBy("createdAt", "asc")
        );
    }
    else if(activeTap === "all"){
      //모든 글 보여주기
      postQuery = query(postRef, orderBy("createdAt", "asc"));
    }else{
      postQuery = query(
        postRef, 
        where('category', "==", activeTap),
        orderBy("createdAt", "asc")
        );
    }
    
    const datas = await getDocs(postQuery);

    datas?.forEach((doc) => {
      const dataObj = {...doc.data(), id: doc.id};
      setPosts((prev) => [...prev, dataObj as PostProps] );
    })
  }

  const handleDelete = async(id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?")

    if(confirm && id){
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.")
      getPosts();
    }
  }

  useEffect(() => {
    getPosts();
  },[activeTap])

  return (
    <>
    {hasNavigation && (
        <div className='post__navigation'>
        <div 
          role="presentation"
          onClick={() => setActiveTab("all")} 
          className={activeTap === "all" ? 'post__navigation--active' : ""}>
          전체</div>
        <div 
          role="presentation"
          onClick={() => setActiveTab("my")} 
          className={activeTap === "my" ? 'post__navigation--active' : ""}>
          나의 글
        </div>
          {CATEGORIES?.map((category) => (
             <div
              key={category} 
              role="presentation"
              onClick={() => setActiveTab(category)} 
              className={activeTap === category ? 'post__navigation--active' : ""}>
              {category}
             </div>
          ))}
      </div>
    )}
      <div className='post-list'>
        {posts?.length > 0 ? posts.map((post, index) => (
          <div key={post?.id} className='post__box'>
            <Link to={`/posts/${post?.id}`}>
              <div className='post__profile-box'>
                <div className='post__profile'></div>
                <div className='post__author-name'>{post?.email}</div>
                <div className='post__date'>{post?.createdAt}</div>
              </div>
              <div className='post__title'>{post?.title}</div>
              <div className='post__text'>{post?.summary}</div>
              </Link> 
                {post?.email === user?.email && (
                  <div className='post__utils-box'>
                    <div className='post__delete' onClick={() => handleDelete(post.id as string)}>삭제</div>
                    <div className='post__edit'>
                      <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                    </div>
                  </div>
                )}
           
          </div>
        )): <div className="post_no-post">게시글이 없습니다.</div>}
      </div>
    </>
  )
}

export default PostList