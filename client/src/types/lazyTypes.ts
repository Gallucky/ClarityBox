import type { ComponentType } from "react";

// Telling TypeScript what shape the imported module should have
export type LazyImportResult = { default: ComponentType<unknown> };
export type LazyModuleMap = Record<string, () => Promise<LazyImportResult>>;

export type LazyComponent = React.LazyExoticComponent<React.ComponentType<any>>;
