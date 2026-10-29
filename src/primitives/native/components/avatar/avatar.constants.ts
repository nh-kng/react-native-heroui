/*
 * Derived from heroui-native/src/components/avatar/avatar.constants.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { AvatarSize } from './avatar.types.js';

/**
 * Display names for Avatar components
 */
export const AVATAR_DISPLAY_NAME = {
  ROOT: 'HeroUINative.Avatar',
  IMAGE: 'HeroUINative.Avatar.Image',
  FALLBACK: 'HeroUINative.Avatar.Fallback',
  BACKGROUND: 'HeroUINative.Avatar.Background',
};

/**
 * Default icon sizes for different avatar sizes
 */
export const AVATAR_DEFAULT_ICON_SIZE: Record<AvatarSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};
