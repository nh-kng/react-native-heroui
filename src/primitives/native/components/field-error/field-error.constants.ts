/*
 * Derived from heroui-native/src/components/field-error/field-error.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { Easing, FadeIn, FadeOut } from 'react-native-reanimated';

/**
 * Display names for the FieldError component parts
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.FieldError',
};

/**
 * Animation duration for focus/blur transitions
 */
export const ANIMATION_DURATION = 150;

/**
 * Animation easing function for focus/blur transitions
 */
export const ANIMATION_EASING = Easing.out(Easing.ease);

/**
 * Default entering animation configuration
 */
export const ENTERING_ANIMATION_CONFIG =
  FadeIn.duration(ANIMATION_DURATION).easing(ANIMATION_EASING);

/**
 * Default exiting animation configuration
 */
export const EXITING_ANIMATION_CONFIG = FadeOut.duration(
  ANIMATION_DURATION / 1.5
).easing(ANIMATION_EASING);
