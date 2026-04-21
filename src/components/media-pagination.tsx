"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clamp, searchParamsToString } from "@/lib/utils";
import { ExploreSearchParams, HomeSearchParams } from "@/lib/validations";

const MediaPagination = ({
  params,
  totalPages,
}: {
  totalPages: number;
  params: Omit<HomeSearchParams, ""> | Omit<ExploreSearchParams, "">;
}) => {
  const router = useRouter();
  const [page, setPage] = useState(String(params.page));
  const nextPage = clamp(params.page + 1, 1, totalPages);
  const prevPage = clamp(params.page - 1, 1, totalPages);

  const handlePageInputChange = () => {
    const inputPage = clamp(Number(page) || 1, 1, totalPages);
    router.push(searchParamsToString({ ...params, page: inputPage }));
  };

  useEffect(() => {
    setPage(String(params.page));
  }, [params.page]);

  return (
    <div className="flex items-center justify-center gap-2">
      <Button size={"icon"} variant={"secondary"} asChild>
        <Link href={searchParamsToString({ ...params, page: 1 })}>
          <ChevronsLeft />
        </Link>
      </Button>
      <Button size={"icon"} asChild>
        <Link href={searchParamsToString({ ...params, page: prevPage })}>
          <ChevronLeft />
        </Link>
      </Button>
      <InputGroup className="max-w-32">
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
        <InputGroupAddon align="inline-end" className="pr-4">
          / {totalPages}
        </InputGroupAddon>
      </InputGroup>
      <Button size={"icon"} asChild>
        <Link href={searchParamsToString({ ...params, page: nextPage })}>
          <ChevronRight />
        </Link>
      </Button>
      <Button size={"icon"} variant={"secondary"} asChild>
        <Link href={searchParamsToString({ ...params, page: totalPages })}>
          <ChevronsRight />
        </Link>
      </Button>
    </div>
  );
};

export default MediaPagination;
