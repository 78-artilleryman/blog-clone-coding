import React, { useState } from 'react'

const COMENTS = [
  {
    id: 1,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
  {
    id: 2,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
  {
    id: 3,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
  {
    id: 4,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
  {
    id: 5,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
  {
    id: 6,
    email: "test@test.com",
    content: "댓글입니다 1.",
    createdAt: "2023-06-13",
  },
]

function Comment() {
  const [comment, setComment] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: {name, value},
    } = e;

    if(name === "comment"){
      setComment(value)
    }
  

  }

  return (
    <div className='comments'>
      <form className='comments_form'>
        <div className='form_block'>
          <label htmlFor="comment">댓글 입력</label>
          <textarea name="comment" id="comment" required value={comment} onChange={onChange}></textarea>
        </div>
        <div className='form_block form_block_revers'>
          <input type="submit" value = "입력" className='form_btn_submit'/>
        </div>
      </form>
      <div className='comments_list'>
        {COMENTS?.map((comment) => (
          <div key={comment.id} className='comment_box'>
            <div className='comment_profile_box'>
              <div className='comment_email'>{comment?.email}</div>
              <div className='comment_date'>{comment?.createdAt}</div>
              <div className='comment_delete'>삭제</div>
            </div>
            <div className='comment_text'>{comment.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comment