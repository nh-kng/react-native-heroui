/*
 * Derived from heroui-native/src/components/text-area/text-area.tsx at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import { forwardRef } from 'react';

import { DISPLAY_NAME } from './text-area.constants.js';
import { textAreaClassNames } from './text-area.styles.js';
import type { TextAreaProps, TextAreaRef } from './text-area.types.js';
import type { TextInputComponent } from '../../helpers/internal/types/index.js';
import Input from '../input/input.js';

// --------------------------------------------------

const TextAreaRoot: TextInputComponent<TextAreaProps> = forwardRef<
  TextAreaRef,
  TextAreaProps
>((props, ref) => {
  const {
    multiline = true,
    textAlignVertical = 'top',
    className,
    ...restProps
  } = props;

  const textAreaClassName = textAreaClassNames.root({ className });

  return (
    <Input
      ref={ref}
      className={textAreaClassName}
      multiline={multiline}
      textAlignVertical={textAlignVertical}
      {...restProps}
    />
  );
});

// --------------------------------------------------

TextAreaRoot.displayName = DISPLAY_NAME.TEXT_AREA;

/**
 * TextArea component - A multiline text input component with styled border and background for collecting longer user input.
 * Extends Input component with multiline support, defaulting to 8 lines and top-aligned text.
 * Supports primary and secondary variants, and integrates with form item state context.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/text-area
 */
const TextArea = TextAreaRoot;

export default TextArea;
