interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropsTable = ({ data }: PropsTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-[var(--border-color)] dark:border-gray-700 shadow-sm">
      <table className="w-full">
        <thead className="bg-[var(--primary-subtle)] dark:bg-[var(--primary-subtle)]">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-color)]">Prop</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-color)]">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-color)]">
              Default
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--text-color)]">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-[var(--surface-hover)] transition-colors">
              <td className="px-4 py-3 text-sm font-mono text-[var(--primary-color)]">
                {row.prop}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-[var(--text-muted)]">
                {row.type}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-[var(--text-muted)]">
                {row.default}
              </td>
              <td className="px-4 py-3 text-sm text-[var(--text-color)]">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
