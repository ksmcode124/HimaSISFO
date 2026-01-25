'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowUpDown, ChevronDown, Filter } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export type FilterMeta = {
  filterable?: boolean;
  filterType?: 'checkbox';
  label?: string;
};

interface ToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (v: string) => void;
}

export function TableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: ToolbarProps<TData>) {
  const sorting = table.getState().sorting;
  const activeSort = sorting[0];

  /* ================= GLOBAL SEARCH (DEBOUNCE) ================= */
  const [search, setSearch] = useState(globalFilter);

  useEffect(() => {
    const id = setTimeout(() => {
      setGlobalFilter(search);
    }, 300);

    return () => clearTimeout(id);
  }, [search, setGlobalFilter]);

  /* ================= FILTERABLE COLUMNS ================= */
  const filterableColumns = table
    .getAllColumns()
    .filter((column) => {
      const meta = column.columnDef.meta as FilterMeta | undefined;
      return meta?.filterable && meta.filterType === 'checkbox';
    });

  return (
    <div className="flex flex-col gap-4 border-b border-[#939393] px-6 py-5">
      <div className="flex items-center justify-between gap-6">
        {/* GLOBAL SEARCH */}
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#F2F2F2] border-2 border-[#BFBFBF] h-12 max-w-md text-base"
        />

        <div className="flex gap-3">
          {/* FILTER */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-11 px-5 gap-2">
                <Filter />
                Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-64">
              {filterableColumns.length === 0 && (
                <DropdownMenuItem disabled>
                  No filterable columns
                </DropdownMenuItem>
              )}

              {filterableColumns.map((column) => {
                const meta = column.columnDef.meta as FilterMeta;
                const options = Array.from(
                  column.getFacetedUniqueValues().keys()
                );

                const activeValues = Array.isArray(column.getFilterValue())
                  ? (column.getFilterValue() as string[])
                  : [];

                return (
                  <div key={column.id} className="px-2 py-2">
                    <div className="mb-1 text-xs font-semibold text-muted-foreground">
                      {meta.label ?? column.id}
                    </div>

                    {options.map((value) => {
                      const checked = activeValues.includes(value);

                      return (
                        <DropdownMenuCheckboxItem
                          key={String(value)}
                          checked={checked}
                          onCheckedChange={(next) => {
                            const updated = next
                              ? [...activeValues, value]
                              : activeValues.filter((v) => v !== value);

                            column.setFilterValue(
                              updated.length ? updated : undefined
                            );
                          }}
                        >
                          {String(value)}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT COLUMN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-11 px-5 gap-2">
                <ArrowUpDown />
                Sort by
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((c) => c.getCanSort())
                .map((column) => (
                  <DropdownMenuItem
                    key={column.id}
                    onClick={() =>
                      table.setSorting([
                        {
                          id: column.id,
                          desc: activeSort?.desc ?? false,
                        },
                      ])
                    }
                  >
                    {String(column.columnDef.header ?? column.id)}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SORT DIRECTION */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-11 px-5 min-w-32 border border-[#BFBFBF]"
                disabled={!activeSort}
              >
                {activeSort?.desc ? 'Z–A' : 'A–Z'}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  activeSort &&
                  table.setSorting([{ ...activeSort, desc: false }])
                }
              >
                A – Z
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  activeSort &&
                  table.setSorting([{ ...activeSort, desc: true }])
                }
              >
                Z – A
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
