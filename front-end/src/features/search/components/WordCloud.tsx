// VisxWordCloud.tsx
import React, { useMemo, useEffect } from "react";
import { Text } from "@visx/text";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { scaleLog } from "@visx/scale";
import { useSpring, animated, config } from "react-spring";

interface PopularKeyword {
  text: string;
  weight: number;
}

interface WordCloudProps {
  keywords: PopularKeyword[];
  onKeywordClick: (keyword: string) => void;
  width?: number;
  height?: number;
}

const colors = [
  "#F86060",
  "#F8D460",
  "#B7E886",
  "#8DBDFF",
  "#FECEE4",
  "#9F89FC", 
  "#CAD3FF",
  "#0F78F1",
];

const AnimatedText = animated(Text);

export default function WordCloud({
  keywords,
  onKeywordClick,
  width = 550,
  height = 350,
}: WordCloudProps) {
  // 인기 키워드 데이터를 visx의 단어 데이터 형태로 변환
  const words = useMemo(() => {
    return keywords
      .map((item) => ({
        text: item.text,
        value: item.weight, // weight를 value로 사용
      }))
      .sort((a, b) => b.value - a.value);
  }, [keywords]);

  // 가중치에 따른 폰트 크기 스케일 (로그 스케일 사용)
  const fontScale = useMemo(() => {
    if (words.length === 0) return () => 16;
    const minVal = Math.min(...words.map((w) => w.value));
    const maxVal = Math.max(...words.map((w) => w.value));
    return scaleLog({
      domain: [minVal, maxVal],
      range: [10, 40], // 폰트 크기 범위 (px)
    });
  }, [words]);

  // react-spring을 활용한 애니메이션 설정
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
  }));

  useEffect(() => {
    api.start({ opacity: 1, scale: 1 });
  }, [api]);

  return (
    // w.text ?? "" 를 통해 w.text가 undefined인 경우를 방지
    <div style={{ width, height }}>
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={(d) => fontScale(d.value)}
        font={"Pretendard"} 
        spiral={"archimedean"}
        rotate={0}
        random={() => 0.5}
      >
        {(cloudWords) =>
        // any 타입 설정을 통해 w.value와 w.text가 @visx/wordcloud에서 제공하는 기본 타입 사용
          cloudWords.map((w: any, i) => (
            <AnimatedText
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor="middle"
              style={{
                ...springs,
                transform: springs.scale.to(
                  (s) =>
                    `translate(${w.x}px, ${w.y}px) rotate(${w.rotate}) scale(${s})`
                ),
              }}
              fontSize={w.size}
              fontFamily={w.font}
              fontWeight={w.value > 70 ? "bold" : "normal"}
              cursor="pointer"
              onClick={() => onKeywordClick(w.text)}
            >
              {w.text ?? ""}
            </AnimatedText>
          ))
        }
      </Wordcloud>
    </div>
  );
}
