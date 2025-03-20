export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
  
  export const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  
  export const checkUserExists = async (kakaoToken: string): Promise<boolean> => {
    const response = await fetch("/api/check-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: kakaoToken }),
    });
    const data = await response.json();
    return data.exists;
  };
  