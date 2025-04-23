
import axios from "axios";

// React는 브라우저에서 실행되므로, 브라우저는 post-service.postapp.svc.cluster.local:8080에 직접 접근할 수 없습니다. (클러스터 내부에서만 접근 가능)
// const API_SERVER_HOST = 'http://post-service.postapp.svc.cluster.local:8080';
// const API_SERVER_HOST = 'http://localhost:8080';

// React에서 API 요청 시 Ingress의 도메인을 사용해야 합니다.
const API_SERVER_HOST = 'http://192.168.207.132:30080';

const prefix = `${API_SERVER_HOST}/api/v1`;


// 게시글 상세조회
export const getPost = async (id) => {

    const res = await axios.get(`${prefix}/posts/${id}`);

    return res.data;
}



// 게시글 등록
export const postPost = async (post) => {

    const res = await axios.post(`${prefix}/posts`, post);

    console.log("res : ", res);

    return res.data;

}



// 게시글 목록 조회
export const getPosts = async (pageParam) => { // { page: 1, size: 10, keyfield: 'title', keyword: '제목' }

    const { page, size, keyfield, keyword } = pageParam;

    console.log('page : ', page);
    console.log('size : ', size);
    console.log('keyfield : ', keyfield);
    console.log('keyword : ', keyword);

    const res = await axios.get(`${prefix}/posts`, { params: { page, size, keyfield, keyword } });  //posts?page=1&size=10

    return res.data;
}

// 게시글 상세조회
export const getDelete = async (id) => {

    const res = await axios.Delete(`${prefix}/posts/${id}`);

    return res.data;
}

