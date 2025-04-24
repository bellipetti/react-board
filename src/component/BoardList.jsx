import { useEffect, useState } from "react";
import { getPosts } from '../api/postApi';
import { useCustomHook } from '../hooks/useCustomHooks';
import PageComponent from "./common/PageComponent";
import { useSearchParams } from "react-router-dom";



const initialState = {
    dtoList: [],
    pageRequestDto: null,
    totalCount: 0,
    pageNumList: [],
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}



const BoardList = () => {

    const [searchParams] = useSearchParams();

    const { moveToList, moveToView, page, size } = useCustomHook();

    const [serverData, setServerData] = useState({ ...initialState });

    const [keyfield, setKeyfield] = useState('');

    const [keyword, setKeyword] = useState('');

    useEffect(() => {

        const keyfieldParam = searchParams.get('keyfield') || '';
        const keywordParam = searchParams.get('keyword') || '';

        console.log('page : ', page);
        console.log('size : ', size);
        console.log('keyfieldParam : ', keyfieldParam);
        console.log('keywordParam : ', keywordParam);


        if (keyfield && keyword) {
            getPosts({ page, size, keyfield: keyfieldParam, keyword: keywordParam })
                .then(data => {
                    console.log('data : ', data);
                    setServerData(data);
                })
                .catch(error => {
                    console.error('Error : ', error);
                })

            setKeyfield(keyfieldParam);
            setKeyword(keywordParam);

        } else {
            getPosts({ page, size })
                .then(data => {
                    console.log('data : ', data);
                    setServerData(data);
                })
                .catch(error => {
                    console.error('Error : ', error);
                })
        }

    }, [page, size]);  // 의존 배열


    const handleChangeKeyfield = (e) => {
        setKeyfield(e.target.value);
        setKeyword("");
    }

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const handleClick = () => {

        const pageNum = 1;

        getPosts({ page: pageNum, size, keyfield, keyword })
            .then(data => {
                console.log('data : ', data);

                setServerData(data);
            })
            .catch(error => {
                console.eror('error : ', error);
            })

        moveToList({ page: pageNum, size, keyfield, keyword });
    }


    return (
        <>
            return (
            <>
                {/* 메인 비주얼 */}
                <div className="main-visual">
                    <div>
                        <h1>AI 시대를 넘어, 미래를 향해</h1>
                        <p>2025 중앙대학교 스타일 게시판</p>
                    </div>
                </div>

                <h3>BoardList Page</h3>

                {/* 검색 폼 */}
                <div style={{ marginBottom: "20px" }}>
                    <select value={keyfield} onChange={handleChangeKeyfield}>
                        <option value="">선택</option>
                        <option value="writer">작성자</option>
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                    </select>
                    &nbsp;&nbsp;
                    <input type="text" placeholder="검색어 입력" value={keyword} onChange={handleChangeKeyword} />
                    &nbsp;&nbsp;
                    <button type="button" onClick={handleClick}>검색</button>
                </div>

                {/* 테이블 */}
                <table className="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serverData.dtoList.map((post, index) => (
                            <tr key={post.id}>
                                <td>{((page - 1) * size) + index + 1}</td>
                                <td onClick={() => moveToView(post.id)} style={{ cursor: 'pointer' }}>{post.title}</td>
                                <td>{post.writer}</td>
                                <td>{post.regDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <PageComponent serverData={serverData} searchCondition={{ keyfield, keyword }} movePage={moveToList} />
            </>
            );


        </>

    );
}

export default BoardList;