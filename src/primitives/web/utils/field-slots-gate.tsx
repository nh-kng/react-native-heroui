/*
 * Derived from heroui-react/packages/react/src/utils/field-slots-gate.tsx at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import type {ReactNode} from "react";

import {FieldSlotsGateContext} from "./use-has-text-slot.js";

/**
 * Opt Description / ErrorMessage into waiting for RAC TextContext slots when
 * nested under a CollectionBuilder root (TagGroup, Select, ComboBox, Autocomplete).
 */
const FieldSlotsGate = ({children}: {children: ReactNode}) => {
  return <FieldSlotsGateContext value>{children}</FieldSlotsGateContext>;
};

export {FieldSlotsGate};
