"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clamp, searchParamsToString } from "@/lib/utils";

const MediaPagination = ({
  params,
  currentPage,
  totalPages,
}: {
  params: object;
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const [page, setPage] = useState(String(currentPage));
  const nextPage = clamp(currentPage + 1, 1, totalPages);
  const prevPage = clamp(currentPage - 1, 1, totalPages);

  const handlePageInputChange = () => {
    const moveToPage = clamp(Number(page) || 1, 1, totalPages);
    router.push(searchParamsToString({ ...params, page: moveToPage }));
  };

  useEffect(() => {
    setPage(String(currentPage));
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button size={"icon"} asChild>
        <Link href={searchParamsToString({ ...params, page: prevPage })}>
          <ChevronLeft />
        </Link>
      </Button>
      <InputGroup className="max-w-40">
        <InputGroupInput
          value={page}
          placeholder="page"
          onChange={(e) => setPage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageInputChange();
            }
          }}
        />
        <InputGroupAddon align="inline-end"> / {totalPages}</InputGroupAddon>
      </InputGroup>
      <Button size={"icon"} asChild>
        <Link href={searchParamsToString({ ...params, page: nextPage })}>
          <ChevronRight />
        </Link>
      </Button>
    </div>
  );
};

export default MediaPagination;
