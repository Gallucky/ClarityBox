import { lazy, Suspense } from "react";
import Spinner from "@components/ui/Spinner";
import type { LazyModuleMap, LazyComponent } from "@/types/lazyTypes";
import type { ComponentType, JSX } from "react";

// Importing all the pages and components.
const pages = import.meta.glob("../pages/**/*.{ts,tsx}") as LazyModuleMap;
const components = import.meta.glob("../components/**/*.{ts,tsx}") as LazyModuleMap;

const scripts: LazyModuleMap = { ...pages, ...components };

const normalize = (path: string) => path.replace(/\\/g, "/");

/**
 * @description
 * This function will get a path to a file to import and will
 * return the lazy loaded component.
 * The lazy components will only be loaded when they are actually required.
 * To load a specific export use the `namedExport` parameter.
 *
 * @tutorial
 * Make sure when using this method that the path is relative to this file.
 * Make sure to wrap the component / code section with the
 * React's Suspense component in the docs.
 * @see {@link https://react.dev/reference/react/Suspense React Docs}.
 *
 * @param {string} relativePath - The path to the module that should be imported.
 * @param {string} [namedExport] - The name of the export that should be used.
 * @returns {React.LazyExoticComponent<any>} The lazy loaded component.
 */
export const lazyImport = (relativePath: string, namedExport?: string) => {
    const loader = scripts[normalize(relativePath)];

    if (!loader) {
        throw new Error(`Module not found in glob: ${relativePath}`);
    }

    return lazy(async () => {
        const promise = await loader();
        // If no named export is specified, return the default export.
        if (!namedExport) return promise;

        const selected = (promise as Record<string, unknown>)[namedExport];

        // If the named export is not found, throw an error.
        if (!selected)
            throw new Error(`Named export "${namedExport}" not found in ${relativePath}`);

        // Return the selected export as the default export.
        return { default: selected as ComponentType<unknown> };
    });
};

/**
 * This method is used to lazily import pages.
 * It takes a string `pageName` as an argument and returns a lazy loaded component.
 * The component is the default export of the module.
 * The path to the module is relative to this file.
 * The module is only loaded when it's actually required.
 *
 * @param {string} pageName - The name of the page that should be imported.
 * @param {boolean} [insideDedicatedFolder] - If the page is not inside a dedicated
 *  folder, named the same as the page name, set this to false.
 * @returns {React.LazyExoticComponent<any>} The lazy loaded component.
 */
export const lazyImportPage = (pageName: string, insideDedicatedFolder: boolean = true) => {
    // Adding the prefix - the path to the pages folder there the pages are located.
    const relativePath = insideDedicatedFolder
        ? `../pages/${pageName}/${pageName}.page.tsx`
        : `../pages/${pageName}.page.tsx`;

    const loader = scripts[normalize(relativePath)];

    if (!loader) {
        throw new Error(`Page not found: ${pageName}`);
    }

    return lazy(loader);
};

/**
 * This method is used to lazily import components.
 * It takes a string `componentName` as an argument and returns a lazy loaded component.
 * The component is the default export of the module.
 * The path to the module is relative to this file.
 * The module is only loaded when it's actually required.
 *
 * @param {string} componentName - The name of the component that should be imported.
 * @param {boolean} [insideDedicatedFolder] - If the component is inside a dedicated
 *  folder named the same as the component name, set this to true.
 * @returns {React.LazyExoticComponent<any>} The lazy loaded component.
 */
export const lazyImportComponent = (componentName: string, insideDedicatedFolder?: boolean) => {
    // Adding the prefix - the path to the components folder there the components are located.
    const relativePath = insideDedicatedFolder
        ? `../components/${componentName}/${componentName}.tsx`
        : `../components/${componentName}.tsx`;

    const loader = scripts[normalize(relativePath)];

    if (!loader) {
        throw new Error(`Component not found: ${componentName}`);
    }

    return lazy(loader);
};

export const lazyLoad = (Component: LazyComponent): JSX.Element => {
    return (
        <Suspense fallback={<Spinner />}>
            <Component />
        </Suspense>
    );
};
