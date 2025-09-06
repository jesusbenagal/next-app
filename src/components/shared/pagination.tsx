"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = Readonly<{ currentPage: number; totalPages: number }>;

export function Pager({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const go = (page: number) => {
    const q = new URLSearchParams(sp.toString());
    q.set("page", String(page));
    router.push(`${pathname}?${q.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) go(currentPage - 1);
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive href="#" onClick={(e) => e.preventDefault()}>
            {currentPage} / {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) go(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
