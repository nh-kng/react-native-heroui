/*
 * Derived from heroui-native/src/optional/gorhom-bottom-sheet.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
let GorhomBottomSheetPackage: any;

try {
  GorhomBottomSheetPackage = require('@gorhom/bottom-sheet');
} catch (_error) {
  /* @gorhom/bottom-sheet is an optional peer dependency */
}

export default GorhomBottomSheetPackage;
