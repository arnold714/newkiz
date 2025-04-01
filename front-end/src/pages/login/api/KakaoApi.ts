export function searchPlaces(keyword: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const kakao = (window as any).kakao;
      if (!kakao || !kakao.maps || !kakao.maps.services) {
        reject("Kakao Maps SDK not loaded");
        return;
      }
  
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(keyword, (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          resolve([]);
        }
      });
    });
  }
  