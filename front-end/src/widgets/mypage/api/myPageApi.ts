import { WrongAnswerItem, WrongAnswerResponse } from "@/features/mypage"
import { customAxios } from "@/shared"

export const GetWrongAnswer = async():Promise<WrongAnswerItem[] | undefined> => {
    try {
        const response = await customAxios.get<WrongAnswerResponse>(`api/records/quiz`);  
        if (response.data.data === null) {
            return undefined;
          }

        return response.data.data;
    } catch(error) {
        console.log('오답 리스트 불러오기 실패:', error)
    }
};

export const PostWrongAnswer = async(quizId: string):Promise<WrongAnswerResponse | undefined> => {
    try {
        const response = await customAxios.post(`/api/records/quiz/${quizId}`);
        return response.data;
    } catch(error) {
        console.error('오답 post 실패:', error)
    }
}