import { useState } from "react";
import type { EventItem } from "../../types";
import "../../styles/DataGrid.css";

type Column = {
  key: keyof EventItem;
  label: string;
};

type Props = {
  data: EventItem[];
  columns: Column[];
  onEdit?: (event: EventItem) => void;
};

export const DataGrid = ({ data, columns, onEdit }: Props) => {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof EventItem>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState("");

  const pageSize = 10;

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase()),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = String(a[sortKey]);
    const bValue = String(b[sortKey]);

    const result = aValue.localeCompare(bValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return sortOrder === "asc" ? result : -result;
  });

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const handleSort = (key: keyof EventItem) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="container">
      <input
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search-input"
      />
      <table border={1} cellPadding={8} role="table" className="table-style">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)} scope="col">
                {col.label}
                {sortKey === col.key && (sortOrder === "asc" ? " △" : " ▽")}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              <td>
                <button onClick={() => onEdit?.(row)} className="edit-button">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {/* First */}
        <button onClick={() => setPage(1)} disabled={page === 1}>
          {"<<"}
        </button>

        {/* Prev */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>

        {/* Numbers */}
        {getPageNumbers().map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className="dots">
              ...
            </span>
          ) : (
            <button
              key={`page-${p}-${index}`}
              onClick={() => setPage(Number(p))}
              className={page === p ? "active-page" : ""}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          {">"}
        </button>

        {/* Last */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
