import { requireNativeView } from 'expo';
import * as React from 'react';

import { HeroUIViewProps } from './HeroUI.types';

const NativeView: React.ComponentType<HeroUIViewProps> = requireNativeView('HeroUI');

export default function HeroUIView(props: HeroUIViewProps) {
  return <NativeView {...props} />;
}
