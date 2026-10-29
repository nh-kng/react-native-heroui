import { useId } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

interface GradientProps {
  colors: string[];
  locations?: number[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export function ScrollGradient({
  colors,
  locations,
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  style,
}: GradientProps) {
  const id = useId();
  return (
    <Svg style={style} pointerEvents="none">
      <Defs>
        <LinearGradient id={id} x1={start.x} y1={start.y} x2={end.x} y2={end.y}>
          {colors.map((color, index) => (
            <Stop
              key={index}
              offset={locations?.[index] ?? index / Math.max(colors.length - 1, 1)}
              stopColor={color}
            />
          ))}
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
