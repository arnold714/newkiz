// 학교 정보
export interface School {
    id: number;
    name: string;
    address: string;
  }
  
  // 첫 로그인 단계에서 관리할 기본 정보
  export interface BasicInfo {
    nickname: string;
    birthdate: string;     // YYYY-MM-DD 형식
    schoolId?: number | null;
    schoolName: string;
    schoolAddress: string;
    gender: string;        // "male" | "female"
  }
  
  // /api/mypage로 POST할 요청 데이터 구조
  export interface MyPageRequest {
    nickname: string;
    birthday: string;
    school: number;                
    gender: "MALE" | "FEMALE";
    difficulty: number;            
    characterId: string;          
    interests: string[];
  }