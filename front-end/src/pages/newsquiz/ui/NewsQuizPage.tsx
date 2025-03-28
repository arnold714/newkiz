
export default function NewsQuizPage() {

    const question = "'뜨거운 감자' 군 가산점제 재도입 가능한가? 위헌 결정에 ㅁㅁㅁㅁ년 페지됐지만 재도입 입법 시도 이어져 군 가산점제 자체가 위헌인지 여부에 재도입 판가름"

    return (
        <div className='bg-white  w-[calc(100%-70px)] mx-auto h-[calc(100%-20px)] my-5 p-5 rounded-xl'>
            <div className="m-3">
                뉴스 | ㅁ 안에 들어갈 말은?
            </div>
            <div className="text-xl font-bold m-3">
                {question}
            </div>

            <div>
                정답
            </div>

            
            <div className='flex justify-end mt-3'>
                <button className='bg-[#7CBA36] w-[100px] h-[40px] rounded-[10px] text-white font-semibold text-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
                >
                정답 확인
                </button>
            </div>
        </div>
    );
};