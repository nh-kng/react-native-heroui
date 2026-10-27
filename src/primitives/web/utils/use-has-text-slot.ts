/*
 * Derived from heroui-react/packages/react/src/utils/use-has-text-slot.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import {createContext, use} from "react";
import {TextContext} from "react-aria-components/Text";

/**
 * Collection roots (TagGroup, etc.) whose children are fed to RAC CollectionBuilder
 * mount a Hidden tree *before* TextContext slots exist. Wrap those roots with
 * `FieldSlotsGate` so Description / ErrorMessage can wait for the visible pass.
 */
const FieldSlotsGateContext = createContext(false);

/**
 * Whether RAC `TextContext.slots[slot]` is available for rendering.
 * Outside a `FieldSlotsGate`, always `true` (standalone / TextField / etc.).
 * Inside a gate, `true` only after the collection root's visible Provider mounts.
 */
const useHasTextSlot = (slot: string): boolean => {
  const gated = use(FieldSlotsGateContext);

  const textContext = use(TextContext) as {
    slots?: Record<string, unknown>;
  } | null;

  if (!gated) return true;

  return textContext?.slots?.[slot] != null;
};

export {FieldSlotsGateContext, useHasTextSlot};
