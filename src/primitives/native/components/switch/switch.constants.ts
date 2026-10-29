/*
 * Derived from heroui-native/src/components/switch/switch.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { Easing } from 'react-native-reanimated';

export const DISPLAY_NAME = {
  SWITCH_ROOT: 'HeroUINative.Switch.Root',
  SWITCH_THUMB: 'HeroUINative.Switch.Thumb',
  SWITCH_START_CONTENT: 'HeroUINative.Switch.StartContent',
  SWITCH_END_CONTENT: 'HeroUINative.Switch.EndContent',
  SWITCH_BACKGROUND: 'HeroUINative.Switch.Background',
} as const;

export const ANIMATION_DURATION = 175;
export const ANIMATION_EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export const DEFAULT_TIMING_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

export const DEFAULT_SPRING_CONFIG = {
  damping: 120,
  stiffness: 1600,
  mass: 2,
};

export const DEFAULT_THUMB_WIDTH = 28;

export const DEFAULT_THUMB_LEFT = 2;
