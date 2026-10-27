/*
 * Derived from heroui-native/src/helpers/internal/types/misc.ts at 1980fbbbd6e8112cf9363614abec683379e89da3.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-native.txt.
 */
type ReactChild =
  | string
  | number
  | bigint
  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
  | Iterable<React.ReactNode>
  | React.ReactPortal
  | Promise<any>;

export type { ReactChild };
