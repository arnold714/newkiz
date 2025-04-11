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

// Enhanced color palette with more vibrant and contrasting colors
const colors = [
  "#FF3366", // Vibrant pink
  "#FF9500", // Vibrant orange
  "#33CC66", // Vibrant green
  "#0066FF", // Vibrant blue
  "#9933FF", // Vibrant purple
  "#FF6699", // Light pink
  "#FFCC00", // Gold
  "#00CCFF"  // Cyan
];

const AnimatedText = animated(Text);

export default function WordCloud({
  keywords,
  onKeywordClick,
  width = 350, // Increased default width
  height = 350, // Increased default height
}: WordCloudProps) {
  const words = useMemo(() => {
    return keywords
      .map((item) => ({
        text: item._id,
        value: item.count,
      }))
      .sort((a, b) => b.value - a.value);
  }, [keywords]);

  // Enhanced font scaling for better visibility
  const fontScale = useMemo(() => {
    if (words.length === 0) return () => 20; // Increased base font size
    const minVal = Math.min(...words.map((w) => w.value));
    const maxVal = Math.max(...words.map((w) => w.value));
    return scaleLog({
      domain: [minVal, maxVal],
      range: [35, 70], // Increased font size range for better visibility
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
    <div className="flex justify-center items-center w-full my-4"> {/* Full width container */}
      <div className="relative" style={{ width, height }}>
        <Wordcloud
          words={words}
          width={width}
          height={height}
          fontSize={(d) => fontScale(d.value)}
          font={"Pretendard"}
          spiral={"archimedean"}
          padding={3} // Added padding between words
          rotate={0}
          // Adjusted random function to better distribute words
          random={() => 0.5}
        >
          {(cloudWords) =>
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
                fontWeight={w.value > 50 ? "bold" : "normal"} // Made more words bold by lowering threshold
                cursor="pointer"
                onClick={() => onKeywordClick(w.text)}
                // Added text stroke for better visibility
                stroke="#FFFFFF"
                strokeWidth={0.5}
              >
                {w.text ?? ""}
              </AnimatedText>
            ))
          }
        </Wordcloud>
      </div>
    </div>
  );
}