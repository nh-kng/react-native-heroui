import { createRef } from 'react';
import { LoadingText, type LoadingTextProps, type LoadingTextRef } from '@nh-kng/react-native-heroui';
import { LoadingText as SubpathLoadingText } from '@nh-kng/react-native-heroui/loading-text';

export const subpathContract: typeof LoadingText = SubpathLoadingText;
export const loadingTextRef = createRef<LoadingTextRef>();
export const variants = ['shimmer', 'pulse', 'none'] as const;
export const sizes = ['sm', 'md', 'lg'] as const;
export const labels = variants.map((variant) => sizes.map((size) => (
  <LoadingText.Root key={`${variant}-${size}`} text="Generating response" variant={variant} size={size} ref={loadingTextRef} />
)));
export const defaults = <SubpathLoadingText />;
export const empty = <LoadingText text="" />;
export const platformProps: LoadingTextProps = {
  nativeProps: { style: { marginTop: 4 }, accessibilityLabel: 'Working' },
  webProps: { id: 'thinking', 'aria-label': 'Working' },
};
export const hostRef: ReturnType<typeof createRef<HTMLSpanElement>> = loadingTextRef;

// @ts-expect-error Children cannot replace the single-line text contract.
export const children = <LoadingText>Thinking</LoadingText>;
// @ts-expect-error Variants are shared and explicitly limited.
export const invalidVariant = <LoadingText variant="wave" />;
// @ts-expect-error Sizes are shared and explicitly limited.
export const invalidSize = <LoadingText size="xl" />;
// @ts-expect-error Platform props cannot replace children.
export const webChildren: LoadingTextProps = { webProps: { children: 'Other text' } };
// @ts-expect-error Platform props cannot replace children.
export const nativeChildren: LoadingTextProps = { nativeProps: { children: 'Other text' } };
// @ts-expect-error Platform props cannot replace the ref.
export const webRef: LoadingTextProps = { webProps: { ref: null } };
// @ts-expect-error Platform props cannot replace the ref.
export const nativeRef: LoadingTextProps = { nativeProps: { ref: null } };
// @ts-expect-error Text classes belong to the shared direct prop.
export const webClassName: LoadingTextProps = { webProps: { className: 'text-lg' } };
// @ts-expect-error Text classes belong to the shared direct prop.
export const nativeClassName: LoadingTextProps = { nativeProps: { className: 'text-lg' } };
// @ts-expect-error Inner HTML cannot replace the visible status text.
export const html: LoadingTextProps = { webProps: { dangerouslySetInnerHTML: { __html: 'other' } } };
