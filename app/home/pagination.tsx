"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from "next/navigation";


export const PaginationComponent = ({ totalPages }: { totalPages: number }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
    const renderPageItems = () => {
        let items = [];
        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink href={createPageURL(i)}
                        aria-disabled={i === currentPage}
                        tabIndex={i === currentPage ? -1 : 0}
                        className={i === currentPage ? "pointer-events-none opacity-50" : undefined}
                    >{i}</PaginationLink>
                </PaginationItem>
            );
        }
        return items;
    };
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageURL(currentPage - 1 > 0 ? currentPage - 1 : 1)}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        className={
                            currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>
                {renderPageItems()}
                <PaginationItem>
                    <PaginationNext href={createPageURL(currentPage + 1 <= totalPages ? currentPage + 1 : totalPages)}
                        aria-disabled={currentPage === totalPages}
                        tabIndex={currentPage === totalPages ? -1 : 0}
                        className={
                            currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
