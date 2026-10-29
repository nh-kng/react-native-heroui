/*
 * Derived from heroui-native/src/components/close-button/close-button.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';

import { DISPLAY_NAME } from './close-button.constants.js';
import closeButtonClassNames from './close-button.styles.js';
import type { CloseButtonProps } from './close-button.types.js';
import { useThemeColor } from '../../helpers/external/hooks/index.js';
import { CloseIcon } from '../../helpers/internal/components/index.js';
import type { PressableRef } from '../../helpers/internal/types/index.js';
import { Button } from '../button/index.js';

// --------------------------------------------------

const CloseButtonRoot = forwardRef<PressableRef, CloseButtonProps>(
  (props, ref) => {
    const { iconProps, className, children, ...restProps } = props;

    const themeColorMuted = useThemeColor('muted');

    /** Resolved root className from close-button styles */
    const rootClassName = closeButtonClassNames.root({ className });

    return (
      <Button
        ref={ref}
        variant="tertiary"
        size="sm"
        isIconOnly
        className={rootClassName}
        hitSlop={12}
        {...restProps}
      >
        {children ?? (
          <CloseIcon
            size={iconProps?.size ?? 18}
            color={iconProps?.color ?? themeColorMuted}
          />
        )}
      </Button>
    );
  }
);

// --------------------------------------------------

CloseButtonRoot.displayName = DISPLAY_NAME.CLOSE_BUTTON_ROOT;

/**
 * Compound CloseButton component
 *
 * @component CloseButton - A specialized button component that renders a close icon by default.
 * It is a Button with default variant='tertiary', size='sm', and isIconOnly=true.
 * The close icon can be customized via the iconProps prop, or you can provide custom children.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/close-button
 */
const CloseButton = CloseButtonRoot;

export default CloseButton;
