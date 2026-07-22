export default function DataTable({ columns, rows, emptyMessage = 'No records yet.' }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="glass-card p-10 text-center text-white/40 text-sm">{emptyMessage}</div>
    )
  }

  return (
    <div className="glass-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/50 text-xs uppercase tracking-wider">
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3.5 font-medium whitespace-nowrap">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-5 py-3.5 text-white/80 whitespace-nowrap">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
