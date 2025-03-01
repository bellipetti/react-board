import { useEffect, useState } from "react";
import { getPost } from '../api/postApi';
import { useParams } from "react-router-dom";


const initialState = {
    id: 0,
    title: '',
    contents: '',
    wrtier: '',
    regDate: ''
}

const BoardView = () => {


    const [ post, setPost ] = useState({...initialState});

    const { id } = useParams();

    useEffect(() => {

        getPost(id)
            .then(data => {
                setPost(data);
            })
            .catch(error => {
                console.error('Error : ', error);
            })



    }, [ id ]); // 의존성 배열

    
    return (
        <>
        <div className="container">
            <div className="title">{ post.id }번 게시글 정보</div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>제목 : </span> { post.title } </div>
            <div className="content"><span style={{fontWeight: 'bold', fontSize: 20}}>내용 : </span> { post.contents }  </div>
            <div className="content">
                Created on  { post.regDate }  by { post.writer }
            </div>

            <div className="form-actions">
                <button>Modify</button>                      
                <button className='btn-sm'>Delete</button>
                <button>List</button>
            </div>    
        </div>
        </>
    );

}


export default BoardView;