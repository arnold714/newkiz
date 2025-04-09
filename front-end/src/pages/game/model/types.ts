export interface SchoolRank {
    rank: number;
    schoolId: number;
    schoolName: string;
    totalScore: number;
  }
  
  export interface SchoolRankingProps {
    success: boolean;
    data: {
      rankings: SchoolRank[];
    };
    error: null | string;
  }
  
  export interface PersonalRank {
    rank: number;
    userId: number;
    nickname: string;
    characterId: string;
    totalScore: number;
  }
  
  export interface PersonalRankingProps {
    success: boolean;
    data: {
      rankings: PersonalRank[];
    };
    error: null | string;
  }
  