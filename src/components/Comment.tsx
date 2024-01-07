import React, { useContext, useState } from 'react'
import { CommentInterfate, PostProps } from './PostList'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface CommentsProps{
  post: PostProps; 
  getpost: (id: string) => Promise<void>;
}

function Comment({post, getpost}: CommentsProps ) {
  const [comment, setComment] = useState("")
  const {user} = useContext(AuthContext)



  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: {name, value},
    } = e;

    if(name === "comment"){
      setComment(value)
    }
  }

  const omSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if(post && post?.id){
        const postRef = doc(db, "posts", post.id);

        if(user?.uid){
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }),
          }
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            }),
          })
          //문서 업데이트
          await getpost(post.id)
        }
      }
      toast.success("댓글을 생성했습니다.")
      setComment("")
    }catch(error: any){
      console.log(error)
      toast.error(error?.code)
    }
  }

  const handleDeleteComment = async (data: CommentInterfate) => {
    const confirnm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if(confirnm && post.id){
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef,{
        comments: arrayRemove(data),
      })

      toast.success("댓글을 삭제했습니다.")
      await getpost(post.id)
    }
  }

  return (
    <div className='comments'>
      <form className='comments_form' onSubmit={omSubmit}>
        <div className='form_block'>
          <label htmlFor="comment">댓글 입력</label>
          <textarea name="comment" id="comment" required value={comment} onChange={onChange}></textarea>
        </div>
        <div className='form_block form_block_revers'>
          <input type="submit" value = "입력" className='form_btn_submit'/>
        </div>
      </form>
      <div className='comments_list'>
        {post?.comments?.slice(0)?.reverse().map((comment) => (
          <div key={comment.createdAt} className='comment_box'>
            <div className='comment_profile_box'>
              <div className='comment_email'>{comment?.email}</div>
              <div className='comment_date'>{comment?.createdAt}</div>
              {comment.uid === user?.uid && (
                 <div className='comment_delete' 
                 onClick={ () => handleDeleteComment(comment)}>삭제</div>
              )}
            </div>
            <div className='comment_text'>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comment