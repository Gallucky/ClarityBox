import { useContext } from "react";

import ProviderError from "@/errors/providerError";

import QueryContext from "./QueryContext";

const useQuery = () => {
    const context = useContext(QueryContext);

    if (context === undefined) {
        throw new ProviderError("QueryProvider", "useQuery must be used within a QueryProvider");
    }

    return context;
};

export default useQuery;
