import { Link } from "react-router-dom"

export default function NotFoundPage() {
  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL
    
    return(
        <div className="w-full h-full flex flex-col justify-center items-center px-5 gap-4">
            <div className="relative h-1/3 aspect-square">
                <img src={`${imgUrl}assets/error.gif`} alt="forbidden page" className="absolute w-full h-full object-cover"/>
            </div>
            <p className="font-bold text-2xl">잘못된 주소입니다.</p>
            <Link to="/" className="bg-[#7CBA36] px-4 py-2 text-xl text-white rounded-lg font-bold mt-10">홈으로 가기</Link>
        </div>
    )
}
