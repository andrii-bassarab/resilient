"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { CategoriesDTO } from "@/types/categories";

export const allCategoryFilters = [
  "All",
  "Web development",
  "Backend development",
  "Design",
  "Finance",
  "Psychology",
] as const;

interface FilterProps {
  categories?: CategoriesDTO[];
}

export const Filters = ({ categories }: FilterProps) => {
  const searchParams = useSearchParams();

  const allCategory = searchParams.get("categoryIds")
    ? JSON.parse(searchParams.get("categoryIds") ?? "")?.[0]
    : categories?.find((category) => category.name === "All")?.id;

  const [selectedFilter, setSelectedFilter] = useState<string[]>([
    allCategory ?? "",
  ]);

  const router = useRouter();
  const pathname = usePathname();

  const handleSelectFilter = (value: string) => {
    if (value === allCategory) {
      setSelectedFilter([allCategory]);

      return;
    }

    if (selectedFilter.includes(value)) {
      setSelectedFilter((prev) => {
        return prev.filter((item) => item !== value).length === 0
          ? [allCategory ?? ""]
          : prev.filter((item) => item !== value);
      });

      return;
    }

    setSelectedFilter((prev) => [
      ...prev.filter((item) => item !== allCategory),
      value,
    ]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(`${pathname}?categoryIds=${JSON.stringify(selectedFilter)}`);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [router, selectedFilter, allCategory, pathname]);

  return (
    <Box>
      <Input placeholder="Search..." className="max-w-[780px] mx-auto" />
      <ToggleGroup
        type="multiple"
        value={selectedFilter}
        className="flex justify-center gap-4 flex-wrap"
      >
        {categories?.map((category) => (
          <Button
            aria-label={category.name}
            key={category.id}
            onClick={() => handleSelectFilter(category.id)}
            variant={
              selectedFilter.includes(category.id) ? "default" : "outline"
            }
            className="border-none"
          >
            <Typography>{category.name}</Typography>
          </Button>
        ))}
      </ToggleGroup>
    </Box>
  );
};
