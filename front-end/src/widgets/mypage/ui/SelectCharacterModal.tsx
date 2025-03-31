import { useState } from 'react';
import { LuChevronLeft } from 'react-icons/lu';
import '@shared/styles/CustomScroll.css';

interface SelectCharacterModalProps {
    closeModal: () => void;
}


export const SelectCharacterModal = ({ closeModal }: SelectCharacterModalProps) => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');

    const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;

    const characters = [
        { id: "cole", img: `${imgUrl}dinos/cole.png` },
        { id: "doux", img: `${imgUrl}dinos/doux.png` },
        { id: "kira", img: `${imgUrl}dinos/kira.png` },
        { id: "kuro", img: `${imgUrl}dinos/kuro.png` },
        { id: "loki", img: `${imgUrl}dinos/loki.png` },
        { id: "mono", img: `${imgUrl}dinos/mono.png` },
        { id: "mort", img: `${imgUrl}dinos/mort.png` },
        { id: "nico", img: `${imgUrl}dinos/nico.png` },
        { id: "olaf", img: `${imgUrl}dinos/olaf.png` },
        { id: "sena", img: `${imgUrl}dinos/sena.png` },
        { id: "tard", img: `${imgUrl}dinos/tard.png` },
        { id: "vita", img: `${imgUrl}dinos/vita.png` },
    ];

    const handleSelect = (id: string) => {
        setSelectedCharacter(id);
    };

    const handleNext = () => {
        if (!selectedCharacter) {
            alert("캐릭터를 선택해주세요.");
            return;
        }
    };

    return (
        <div className="w-full h-full">
            <div className="relative w-full h-full z-10 flex-1 px-6 overflow-y-auto scroll">
                <div className="flex flex-row justify-start items-center gap-3 mt-5">
                    <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                    <p className="font-bold text-xl">캐릭터 변경</p>
                </div>
                <div className="flex flex-col items-center mt-1 mb-10">
                    <div className="mt-3 bg-white rounded-full p-1 shadow-md">
                        {selectedCharacter ? (
                            <div className="relative">
                                <img
                                    src={characters.find(c => c.id === selectedCharacter)?.img || "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kira.png"}
                                    alt="Selected character"
                                    className="w-24 h-24 rounded-full transition-all duration-300 hover:scale-105"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md">
                                    ✓
                                </div>
                            </div>
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400">선택</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-items-center my-4">
                    {characters.map((char) => (
                        <button
                            key={char.id}
                            onClick={() => handleSelect(char.id)}
                            className={`w-[85px] h-[85px] rounded-full flex items-center justify-center p-1 mb-2
                  ${selectedCharacter === char.id
                                    ? "ring-3 ring-blue-500 bg-blue-50 transform scale-105 shadow-lg transition-all duration-300"
                                    : "bg-white hover:bg-gray-50 shadow hover:shadow-md transition-all duration-200"}`}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={char.img}
                                    alt={char.id}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </button>
                    ))}
                </div>
                <div className="sticky bottom-4 mt-2 mb-4">
                    <button
                        onClick={selectedCharacter ? handleNext : undefined}
                        disabled={!selectedCharacter}
                        className={`w-full font-semibold text-lg py-3 rounded-lg transition-all duration-300 transform
                        ${selectedCharacter
                                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white cursor-pointer hover:from-indigo-600 hover:to-blue-600 hover:shadow-lg"
                                : "hidden"
                            }`}
                    >
                        <p className="font-bold">수정하기</p>
                    </button>
                </div>
            </div>
        </div>
    );
}