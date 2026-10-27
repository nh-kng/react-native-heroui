/*
 * Derived from heroui-react/packages/styles/src/components/table/table.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const tableVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "table-root",
    body: "table__body",
    cell: "table__cell",
    column: "table__column",
    columnResizer: "table__column-resizer",
    content: "table__content",
    footer: "table__footer",
    header: "table__header",
    loadMore: "table__load-more",
    loadMoreContent: "table__load-more-content",
    resizableContainer: "table__resizable-container",
    row: "table__row",
    scrollContainer: "table__scroll-container",
    sortableColumnHeader: "table__sortable-column-header",
    sortableColumnIndicator: "table__sortable-column-indicator",
  },
  variants: {
    variant: {
      primary: {
        base: "table-root--primary",
      },
      secondary: {
        base: "table-root--secondary",
      },
    },
  },
});

// Exclude React Aria render prop keys from the variant types
type TableRenderPropsKeys =
  | "isHovered"
  | "isFocused"
  | "isFocusVisible"
  | "isSelected"
  | "isDisabled"
  | "isDragging"
  | "isDropTarget"
  | "state";

export type TableVariants = Omit<VariantProps<typeof tableVariants>, TableRenderPropsKeys>;
