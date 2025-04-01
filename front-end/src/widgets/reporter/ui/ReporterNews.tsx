import { useState } from 'react';
import { FaRegBookmark, FaBookmark, FaHeart, FaRegHeart, FaRegComment   } from "react-icons/fa6";

export const ReporterNews = () => {

    const [isReporterNewsScrapped, setIsReporterNewsScrapped] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    return (
        <div className="pt-2">
            <div className="">
                <div className="flex items-center gap-2">
                    <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" 
                        className='w-15 h-15 m-1 p-2 border-2 bg-white border-[#EFEFEF] rounded-[50px]'
                    />
                    <p className="text-xl font-semibold text-[#202020]">zizon 재형</p>
                </div>
                <div className="bg-gray-200 w-auto h-80">
                    사진이 들어갈 것
                </div>
                <div className='flex justify-between '>
                    <div className='flex items-center gap-2'>
                        {isLiked ? (
                            <FaHeart 
                                size={25}
                                onClick={() => setIsLiked(!isLiked)}
                                className="cursor-pointer text-black"
                            />
                        ) : (
                            <FaRegHeart 
                                size={25}
                                onClick={() => setIsLiked(!isLiked)}
                                className="cursor-pointer text-black"
                            />
                        )}
                        <div>
                            <FaRegComment 
                                size={25}
                            />
                        </div>
                    </div>
                    <div>
                        {isReporterNewsScrapped ? (
                            <FaBookmark 
                                size={25}
                                onClick={() => setIsReporterNewsScrapped(!isReporterNewsScrapped)}
                                className="cursor-pointer text-black"
                            />
                        ) : (
                            <FaRegBookmark 
                                size={25}
                                onClick={() => setIsReporterNewsScrapped(!isReporterNewsScrapped)}
                                className="cursor-pointer text-black"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
