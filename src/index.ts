// Reexport the native module. On web, it will be resolved to HeroUIModule.web.ts
// and on native platforms to HeroUIModule.ts
export { default } from './HeroUIModule';
export { default as HeroUIView } from './HeroUIView';
export * from './HeroUI.types';
