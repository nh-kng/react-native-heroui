/*
 * Derived from heroui-native/src/optional/expo-blur.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
import type { ComponentRef, ComponentType, RefAttributes } from 'react';
import type { View, ViewProps } from 'react-native';

/**
 * Mirrors expo-blur's `BlurTint` union. Kept in sync manually because
 * expo-blur is an optional peer dependency and cannot be imported statically.
 */
export type ExpoBlurTint =
  | 'light'
  | 'dark'
  | 'default'
  | 'extraLight'
  | 'regular'
  | 'prominent'
  | 'systemUltraThinMaterial'
  | 'systemThinMaterial'
  | 'systemMaterial'
  | 'systemThickMaterial'
  | 'systemChromeMaterial'
  | 'systemUltraThinMaterialLight'
  | 'systemThinMaterialLight'
  | 'systemMaterialLight'
  | 'systemThickMaterialLight'
  | 'systemChromeMaterialLight'
  | 'systemUltraThinMaterialDark'
  | 'systemThinMaterialDark'
  | 'systemMaterialDark'
  | 'systemThickMaterialDark'
  | 'systemChromeMaterialDark';

export type ExpoBlurBlurViewProps = ViewProps & {
  intensity?: number;
  tint?: ExpoBlurTint;
  className?: string;
};

export type ExpoBlurModule = {
  BlurView: ComponentType<
    ExpoBlurBlurViewProps & RefAttributes<ComponentRef<typeof View>>
  >;
};

let ExpoBlurPackage: ExpoBlurModule | undefined;

try {
  ExpoBlurPackage = require('expo-blur');
} catch (_error) {
  /* expo-blur is an optional peer dependency */
}

export default ExpoBlurPackage;
