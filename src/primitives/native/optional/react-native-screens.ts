/*
 * Derived from heroui-native/src/optional/react-native-screens.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
let ReactNativeScreensPackage: any;

try {
  ReactNativeScreensPackage = require('react-native-screens');
} catch (_error) {
  /* react-native-screens is an optional peer dependency */
}

export default ReactNativeScreensPackage;
