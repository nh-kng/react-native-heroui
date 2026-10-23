import { HeroUIViewProps } from './HeroUI.types';

// HeroUIView is not available on the web platform.
export default function HeroUIView(_props: HeroUIViewProps) {
  throw new Error('HeroUIView is not available on the web platform.');
}
