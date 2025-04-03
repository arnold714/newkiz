import axios from "axios";
import { School } from "@/entities/school/model/types";

const API_URL = import.meta.env.VITE_API_URL;

interface SchoolListResponse {
  data: School[];
}

export async function getSchoolList(query: string): Promise<School[]> {
  const response = await axios.get<SchoolListResponse>(
    `${API_URL}/api/mypage/school`,
    {
      params: { query },
      withCredentials: true,
    }
  );
  // 응답 구조가 { data: [ { id, name, address }, ... ] } 라면
  return response.data.data;
}