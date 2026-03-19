import { useState } from "react";
import type { EventItem } from "../../types";

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

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "20px",
  };

  const thStyle = {
    background: "#f3f4f6",
    padding: "10px",
    textAlign: "center" as const,
    cursor: "pointer",
  };

  const tdStyle = {
    padding: "10px",
    borderTop: "1px solid #eee",
  };
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <input
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
      <table border={1} cellPadding={8} role="table" style={tableStyle}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={thStyle}
                scope="col"
              >
                {col.label}
                {sortKey === col.key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
            <th style={thStyle}>Actions</th>
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
                <td key={col.key} style={tdStyle}>
                  {row[col.key]}
                </td>
              ))}
              <td style={tdStyle}>
                <button onClick={() => onEdit?.(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        style={{
          padding: "6px 12px",
          margin: 4,
          cursor: "pointer",
        }}
      >
        Prev
      </button>
      <button
        onClick={() => setPage((p) => p + 1)}
        style={{
          padding: "6px 12px",
          margin: 4,
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
};
