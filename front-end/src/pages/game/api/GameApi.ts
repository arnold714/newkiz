import { customAxios } from "@/shared";
import { PersonalRankingProps, SchoolRankingProps } from "../model/types";

export const getSchoolRank = async (): Promise<SchoolRankingProps> => {
  const response = await customAxios.get("/api/game/rank/school");
  return response.data;
};

export const getPersonalRank = async (): Promise<PersonalRankingProps> => {
  const response = await customAxios.get("/api/game/rank/user");
  return response.data;
};
