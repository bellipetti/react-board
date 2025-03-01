import { useState } from "react";
import { postPost } from '../api/postApi'
import { useCustomHook } from "../hooks/useCustomHooks";

const initialState = {
    title: '',
    contents: '',
    writer: ''
}


const BoardWrite = () => {

    const { moveToList, moveToView, page, size } = useCustomHook();

    const [ post, setPost ] = useState({...initialState});

    const handleChange = (e) => {  // event 객체

        post[e.target.name] = e.target.value;
        
        setPost({...post}); 

    }

    const handleClickSave = () => {
        if (!post.title) {  
            alert('제목을 입력하세요');
        } else if (!post.contents) {
            alert('내용을 입력하세요');
        } else if(!post.writer) {
            alert('작성자를 입력하세요');
        } else {
        
            if (confirm("게시글을 등록하시겠습니까?")) { 
                postPost(post)
                    .then(data => {
                        setPost({...initialState});
                        moveToList({page: 1});
                    })
                    .catch(error => {
                        console.error('Error : ', error);
                    })
            }
        }

    }


    return (
        <>
            <div className="form-container">

                <h1 className="form-title">게시글 작성</h1>

                <div className="form-group-horizontal">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" placeholder="제목을 입력하세요." value={post.title} onChange={handleChange} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="writer">작성자</label>
                    <input type="text" name="writer" placeholder="작성자를 입력하세요." value={post.writer} onChange={handleChange} />
                </div>
                <div className="form-group-horizontal">
                    <label htmlFor="contents">내용</label>
                    <textarea name="contents" placeholder="내용을 입력하세요." onChange={handleChange} value={post.contents}></textarea>
                </div>
                <div className="form-actions">
                <button type="button" onClick={handleClickSave}>저장</button>
                <button type="button">초기화</button>
                </div>    
            </div>

           

        </>
    )

}

export default BoardWrite;