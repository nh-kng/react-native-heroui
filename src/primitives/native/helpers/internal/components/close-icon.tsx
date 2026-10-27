/*
 * Derived from heroui-native/src/helpers/internal/components/close-icon.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useThemeColor } from '../../external/hooks/index.js';

interface CloseIconProps {
  size?: number;
  color?: string;
}

export const CloseIcon: React.FC<CloseIconProps> = ({ size = 16, color }) => {
  const themeColorForeground = useThemeColor('foreground');

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color ?? themeColorForeground}
    >
      <Path
        d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8L3.47 4.53a.75.75 0 0 1 0-1.06"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Svg>
  );
};

CloseIcon.displayName = 'HeroUINative.CloseIcon';
