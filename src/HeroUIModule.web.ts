import { registerWebModule, NativeModule } from 'expo';

// HeroUIModule is not available on the web platform.
class HeroUIModule extends NativeModule<{}> {}

export default registerWebModule(HeroUIModule, 'HeroUIModule');
