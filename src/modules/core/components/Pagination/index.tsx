"use client";

import { ChevronFirst, ChevronLast } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  itemsPerPage = 10,
  totalItems = 0,
}: PaginationComponentProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const currentItemsCount = Math.min(
    itemsPerPage,
    totalItems - (currentPage - 1) * itemsPerPage
  );

  return (
    <div className="flex items-center justify-between">
      {showInfo && (
        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      )}

      <Pagination>
        <PaginationContent>
          {/* First Page Button */}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(1);
              }}
              className={`cursor-pointer flex items-center gap-1 ${
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              aria-label="Go to first page"
            >
              <ChevronFirst className="h-4 w-4" />
              <span className="hidden sm:inline">First</span>
            </PaginationLink>
          </PaginationItem>

          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pageNumbers.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum);
                }}
                isActive={currentPage === pageNum}
                className="cursor-pointer"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {/* Last Page Button */}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(totalPages);
              }}
              className={`cursor-pointer flex items-center gap-1 ${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
              aria-label="Go to last page"
            >
              <span className="hidden sm:inline">Last</span>
              <ChevronLast className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {showInfo && (
        <div className="text-sm text-gray-600">
          Showing {currentItemsCount} of {totalItems} items
        </div>
      )}
    </div>
  );
}
