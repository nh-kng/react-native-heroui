import { NativeModule, requireNativeModule } from 'expo';

declare class HeroUIModule extends NativeModule<{}> {}

export default requireNativeModule<HeroUIModule>('HeroUI');
