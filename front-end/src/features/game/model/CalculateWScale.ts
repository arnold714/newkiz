export const calculateWScale = (width: number): number => {
    const minWidth = 360;
    const maxWidth = 600;
    const minScale = 0.6;
    const maxScale = 1;
  
    // 너비가 범위를 벗어나면 최소 또는 최대 스케일 반환
    if (width <= minWidth) return minScale;
    if (width >= maxWidth) return maxScale;
  
    // 선형 보간법을 사용하여 스케일 계산
    const scale = minScale + (maxScale - minScale) * ((width - minWidth) / (maxWidth - minWidth));
    
    // 소수점 둘째 자리까지 반올림
    return Math.round(scale * 100) / 100;
  };
  