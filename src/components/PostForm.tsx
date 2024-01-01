import React from 'react'

function PostForm() {
  return (
    <>
      <form action='/post' method='POST' className='form'>
        <div className='form_block'>
          <label htmlFor="title">제목</label>
          <input type="text" name='title' id='title' required />
        </div>
        <div className='form_block'>
          <label htmlFor="summary">요약</label>
          <input type="text" name='summary' id='summary' required />
        </div>
        <div className='form_block'>
          <label htmlFor="content">내용</label>
          <textarea name='content' id='summary' required />
        </div>
        <div className='form_block'>
          <input type="submit" value="제출" className='form_btn_submit' />
        </div>
      </form>
    </>
  )
}

export default PostForm