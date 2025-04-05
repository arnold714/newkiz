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
    profile: {
      nickname: string;
      birthday: string;
      school: {
        id?: number | null;
        name: string;
        address: string;
      };
      gender: "MALE" | "FEMALE";
      // 캐릭터 저장 필드가 있다면 추가
      // characterId?: string;
    };
    interests: string[];
  }