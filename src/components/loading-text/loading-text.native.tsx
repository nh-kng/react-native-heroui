import MaskedView from '@react-native-masked-view/masked-view';
import { forwardRef, useEffect, useId, useState, type ComponentRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { loadingTextDuration, loadingTextSweep, resolveLoadingText } from './loading-text-state.js';
import type { LoadingTextProps } from './loading-text.types.js';
import { useThemeColor } from '../../primitives/native/helpers/external/hooks/index.js';
import { cn } from '../../primitives/native/helpers/external/utils/cn.js';
import { HeroText } from '../../primitives/native/helpers/internal/components/hero-text.js';
import {
  useCombinedAnimationDisabledState,
  useIsRTL,
} from '../../primitives/native/helpers/internal/hooks/index.js';

export type * from './loading-text.types.js';
export type LoadingTextRef = ComponentRef<typeof View>;

const sizeClasses = {
  sm: 'text-sm leading-5',
  md: 'text-base leading-6',
  lg: 'text-lg leading-7',
};

const Root = forwardRef<LoadingTextRef, LoadingTextProps>(function LoadingText(
  { text, variant, size, className, nativeProps, webProps: _webProps },
  ref
) {
  const disabled = useCombinedAnimationDisabledState(undefined);
  const state = resolveLoadingText({ text, variant, size }, disabled);
  const isRTL = useIsRTL();
  const foreground = useThemeColor('foreground');
  const muted = useThemeColor('muted');
  const gradientId = `loading-text-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [width, setWidth] = useState(0);
  const progress = useSharedValue(0);
  const activeVariant = width > 0 ? state.variant : 'none';
  const [start, end] = loadingTextSweep(width, isRTL);
  const textClassName = cn('font-normal', sizeClasses[state.size], className);

  useEffect(() => {
    progress.set(0);
    if (activeVariant !== 'none') {
      progress.set(
        withRepeat(
          withTiming(1, {
            duration: activeVariant === 'pulse' ? loadingTextDuration / 2 : loadingTextDuration,
            easing: activeVariant === 'pulse' ? Easing.inOut(Easing.ease) : Easing.linear,
          }),
          -1,
          activeVariant === 'pulse',
          undefined,
          ReduceMotion.System
        )
      );
    }
    return () => cancelAnimation(progress);
  }, [activeVariant, state.text, width, isRTL, progress]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.get(), [0, 1], [start, end]) }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: activeVariant === 'pulse' ? interpolate(progress.get(), [0, 1], [0.45, 1]) : 1,
  }));

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={state.text}
      accessibilityLiveRegion="polite"
      {...nativeProps}
      ref={ref}
      style={[styles.root, nativeProps?.style]}>
      <View
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.content}>
        <Animated.View style={pulseStyle}>
          <HeroText
            accessible={false}
            numberOfLines={1}
            className={textClassName}
            style={{ color: activeVariant === 'pulse' ? foreground : muted }}
            onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
            {state.text}
          </HeroText>
        </Animated.View>
        {activeVariant === 'shimmer' && (
          <MaskedView
            pointerEvents="none"
            androidRenderingMode="hardware"
            style={StyleSheet.absoluteFill}
            maskElement={
              <HeroText
                accessible={false}
                numberOfLines={1}
                className={textClassName}
                style={styles.mask}>
                {state.text}
              </HeroText>
            }>
            <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
              <Svg width="100%" height="100%">
                <Defs>
                  <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor={foreground} stopOpacity={0} />
                    <Stop offset="20%" stopColor={foreground} stopOpacity={0} />
                    <Stop offset="50%" stopColor={foreground} />
                    <Stop offset="80%" stopColor={foreground} stopOpacity={0} />
                    <Stop offset="100%" stopColor={foreground} stopOpacity={0} />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
              </Svg>
            </Animated.View>
          </MaskedView>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: { alignSelf: 'flex-start', maxWidth: '100%', flexShrink: 1 },
  content: { maxWidth: '100%', flexShrink: 1 },
  mask: { color: 'black', backgroundColor: 'transparent', opacity: 1 },
});

export const LoadingText = Object.assign(Root, { Root });
