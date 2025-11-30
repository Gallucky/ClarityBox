import { Rows3, Table as TableIcon } from "lucide-react";
import { Toggle } from "@components/ui/shadcn/toggle";

type LayoutToggleProps = {
    toggledLayout: "list" | "table";
    setLayout: (layout: "list" | "table") => void;
    className?: string;
};

const LayoutToggle = (props: LayoutToggleProps) => {
    const { setLayout, toggledLayout } = props;

    const handleChangeLayout = (layout: "list" | "table") => {
        setLayout(layout);
    };

    return (
        <>
            <div className="layout-toggle">
                <Toggle
                    aria-label="Table Layout"
                    size="sm"
                    variant="outline"
                    className="layout"
                    data-state={toggledLayout === "table" ? "on" : "off"}
                    onClick={() => handleChangeLayout("table")}
                >
                    <TableIcon />
                    <span>Table</span>
                </Toggle>
                <Toggle
                    aria-label="List Layout"
                    size="sm"
                    variant="outline"
                    className="layout"
                    data-state={toggledLayout === "list" ? "on" : "off"}
                    onClick={() => handleChangeLayout("list")}
                >
                    <Rows3 />
                    <span>List</span>
                </Toggle>
            </div>
        </>
    );
};

export default LayoutToggle;
