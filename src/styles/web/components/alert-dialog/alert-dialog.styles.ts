/*
 * Derived from heroui-react/packages/styles/src/components/alert-dialog/alert-dialog.styles.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";

export const alertDialogVariants = tv({
  defaultVariants: {
    size: "md",
    status: "danger",
    variant: "opaque",
  },
  slots: {
    backdrop: "alert-dialog__backdrop",
    body: "alert-dialog__body",
    closeTrigger: "alert-dialog__close-trigger",
    container: "alert-dialog__container",
    dialog: "alert-dialog__dialog",
    footer: "alert-dialog__footer",
    header: "alert-dialog__header",
    heading: "alert-dialog__heading",
    icon: "alert-dialog__icon",
    trigger: "alert-dialog__trigger",
  },
  variants: {
    size: {
      cover: {
        dialog: "alert-dialog__dialog--cover",
      },
      lg: {
        dialog: "alert-dialog__dialog--lg",
      },
      md: {
        dialog: "alert-dialog__dialog--md",
      },
      sm: {
        dialog: "alert-dialog__dialog--sm",
      },
      xs: {
        dialog: "alert-dialog__dialog--xs",
      },
    },
    status: {
      accent: {
        icon: "alert-dialog__icon--accent",
      },
      danger: {
        icon: "alert-dialog__icon--danger",
      },
      default: {
        icon: "alert-dialog__icon--default",
      },
      success: {
        icon: "alert-dialog__icon--success",
      },
      warning: {
        icon: "alert-dialog__icon--warning",
      },
    },
    variant: {
      blur: {
        backdrop: "alert-dialog__backdrop--blur",
      },
      opaque: {
        backdrop: "alert-dialog__backdrop--opaque",
      },
      transparent: {
        backdrop: "alert-dialog__backdrop--transparent",
      },
    },
  },
});

export type AlertDialogVariants = VariantProps<typeof alertDialogVariants>;
