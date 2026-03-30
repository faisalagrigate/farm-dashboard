"use client";

import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ChevronUp, ChevronDown, Search, Filter, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  searchPlaceholder?: string;
  onAdd?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalPages?: number;
  totalRecords?: number;
  currentPage?: number;
}

export function DataTable({
  data,
  columns,
  title,
  searchPlaceholder = "Search...",
  onAdd,
  onEdit,
  onDelete,
  pageSize: initialPageSize = 10,
  onPageChange,
  onPageSizeChange,
  totalPages: externalTotalPages,
  totalRecords,
  currentPage: externalCurrentPage
}: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [internalPage, setInternalPage] = useState(1);

  const currentPage = externalCurrentPage || internalPage;
  const pageSize = initialPageSize;

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (search) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // Apply column filter
    if (filterColumn && filterValue) {
      result = result.filter(row =>
        String(row[filterColumn]).toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const direction = sortDirection === 'asc' ? 1 : -1;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * direction;
        }

        return String(aVal).localeCompare(String(bVal)) * direction;
      });
    }

    return result;
  }, [data, search, sortColumn, sortDirection, filterColumn, filterValue]);

  const paginatedData = useMemo(() => {
    if (onPageChange) return filteredAndSortedData; // Assume server-side pagination
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize, onPageChange]);

  const totalPages = externalTotalPages || Math.ceil(filteredAndSortedData.length / pageSize);
  const displayTotalRecords = totalRecords || filteredAndSortedData.length;

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalPage(page);
    }
  };

  const renderCellContent = (column: Column, row: any) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    // Auto-render common data types
    if (typeof value === 'boolean') {
      return <Badge variant={value ? 'default' : 'secondary'}>{value ? 'Yes' : 'No'}</Badge>;
    }

    if (column.key.includes('status')) {
      const statusColors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800',
        optimal: 'bg-green-100 text-green-800',
        warning: 'bg-orange-100 text-orange-800',
        critical: 'bg-red-100 text-red-800',
      };
      return (
        <Badge className={statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
          {value}
        </Badge>
      );
    }

    return value;
  };

  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          <p className="text-xs text-gray-600">{displayTotalRecords} records</p>
        </div>
        {onAdd && (
          <Button onClick={onAdd} size="sm" className="bg-green-600 hover:bg-green-700">
            Add New
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs"
          />
        </div>

        <Select value={filterColumn} onValueChange={setFilterColumn}>
          <SelectTrigger className="w-32 h-8 text-xs">
            <Filter className="h-3 w-3 mr-1" />
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            {columns.filter(col => col.filterable).map(column => (
              <SelectItem key={column.key} value={column.key} className="text-xs">
                {column.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {filterColumn && (
          <Input
            placeholder="Filter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="w-32 h-8 text-xs"
          />
        )}
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th
                  key={column.key}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wide"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.key)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ?
                            <ChevronUp className="h-3 w-3" /> :
                            <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronUp className="h-3 w-3 text-gray-400" />
                        )}
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                {columns.map(column => (
                  <td key={column.key} className="px-3 py-2 text-xs text-gray-900">
                    {renderCellContent(column, row)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-3 py-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row)} className="text-xs">
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem onClick={() => onDelete(row)} className="text-xs text-red-600">
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-600">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, displayTotalRecords)} of {displayTotalRecords} results
          </p>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-7 text-xs"
            >
              Previous
            </Button>

            {(() => {
              let startPage = Math.max(1, currentPage - 2);
              let endPage = Math.min(totalPages, startPage + 4);
              if (endPage === totalPages) startPage = Math.max(1, endPage - 4);

              return Array.from({ length: (endPage - startPage) + 1 }, (_, i) => {
                const page = startPage + i;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="h-7 w-7 text-xs"
                  >
                    {page}
                  </Button>
                );
              });
            })()}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-7 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}