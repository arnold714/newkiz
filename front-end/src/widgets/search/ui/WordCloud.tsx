import { useMemo, useEffect } from "react";
import { Text } from "@visx/text";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { scaleLog } from "@visx/scale";
import { useSpring, animated, config } from "react-spring";
import { WordCloudItem } from "@/features/search";

interface WordCloudProps {
  keywords: WordCloudItem[];
  onKeywordClick: (keyword: string) => void;
  width?: number;
  height?: number;
}

const colors = [
  "#F86060", "#F8D460", "#B7E886", "#8DBDFF", "#FECEE4", 
  "#9F89FC", "#CAD3FF", "#0F78F1"
];

const AnimatedText = animated(Text);

export default function WordCloud({
  keywords,
  onKeywordClick,
  width = 360,
  height = 360,
}: WordCloudProps) {
  const words = useMemo(() => {
    return keywords
      .map((item) => ({
        text: item._id,
        value: item.count, // count를 value로 사용
      }))
      .sort((a, b) => b.value - a.value); // 높은 가중치가 앞에 오도록 정렬
  }, [keywords]);

  const fontScale = useMemo(() => {
    if (words.length === 0) return () => 16;
    const minVal = Math.min(...words.map((w) => w.value));
    const maxVal = Math.max(...words.map((w) => w.value));
    return scaleLog({
      domain: [minVal, maxVal],
      range: [10, 40], // 폰트 크기 범위 (px)
    });
  }, [words]);

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    config: config.gentle,
  }));

  useEffect(() => {
    api.start({ opacity: 1, scale: 1 });
  }, [api]);

  return (
    <div className="flex justify-center items-center" style={{ width, height }}>
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={(d) => fontScale(d.value)}  // 글씨 크기 가중치에 맞게 설정
        font={"Pretendard"} 
        spiral={"archimedean"}
        rotate={0}
        random={() => 0.5}
      >
        {(cloudWords) =>
          cloudWords.map((w: any, i) => (
            <AnimatedText
              key={w.text}
              fill={colors[i % colors.length]} // 색상
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
              fontWeight={w.value > 70 ? "bold" : "normal"}  // 높은 가중치일수록 더 두껍게
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