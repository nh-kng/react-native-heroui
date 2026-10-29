/*
 * Derived from heroui-react/packages/react/src/hooks/use-safe-layout-effect.ts at e385ac202b2cdb94b1bf6fa76d32c31c8259cc5e.
 * Modified locally for owned imports, contracts, or shared styling.
 * Upstream license notice: docs/upstream/licenses/heroui-react.txt.
 */
"use client";

import {useEffect, useLayoutEffect} from "react";

export const useSafeLayoutEffect = globalThis?.document ? useLayoutEffect : useEffect;
