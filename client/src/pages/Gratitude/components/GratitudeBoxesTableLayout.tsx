import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/shadcn/table";
import formatDateTimeLocale from "@utils/formatDateTime";
import type { GratitudeBoxData } from "@pages/Gratitude/types/GratitudeBoxData";

type GratitudeBoxesTableLayoutProps = {
    gratitudeBoxes?: GratitudeBoxData[];
};

const GratitudeBoxesTableLayout = (props: GratitudeBoxesTableLayoutProps) => {
    const { gratitudeBoxes = [] } = props;
    const navigate = useNavigate();

    return (
        <Table className="w-[500px] md:w-full">
            <TableHeader className="*:**:ps-2!">
                <TableRow>
                    <TableHead className="w-[40%]">Content Preview</TableHead>
                    <TableHead>Posted At</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead className="text-center">Created By</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {gratitudeBoxes.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="text-muted-foreground h-24 text-center"
                        >
                            No entries found.
                        </TableCell>
                    </TableRow>
                ) : (
                    gratitudeBoxes.map((box) => (
                        <TableRow
                            key={box._id}
                            className="*:ps-2! *:select-none"
                            onClick={() =>
                                navigate(`/gratitude-boxes/${box._id}`)
                            }
                        >
                            {/* Content Preview with CSS Truncation */}
                            <TableCell className="max-w-[300px]">
                                <p title={box.content}>
                                    {box.content.substring(0, 30) + "..."}
                                </p>
                            </TableCell>

                            {/* Date */}
                            <TableCell className="whitespace-nowrap">
                                {formatDateTimeLocale(box.createdAt)}
                            </TableCell>

                            {/* Likes with Icon Alignment */}
                            <TableCell>
                                <div className="flex items-center gap-1.5">
                                    <span>{box.likes.length}</span>
                                    <Heart className="size-4 fill-rose-500 text-rose-500" />
                                </div>
                            </TableCell>

                            {/* Creator Profile */}
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <img
                                        src={box.creator.profilePicture}
                                        alt={`${box.creator.nickname}'s profile`}
                                        className="size-8 rounded-full border-2 border-slate-200 object-cover"
                                    />
                                    <span className="font-medium">
                                        {box.creator.nickname}
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
};

export default GratitudeBoxesTableLayout;
