import React from 'react';

const Table = ({ children }) => {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full leading-normal">
                {children}
            </table>
        </div>
    );
};

const Header = ({ children }) => (
    <thead className="bg-gray-50 border-b border-gray-200">
        <tr>{children}</tr>
    </thead>
);

const HeaderCell = ({ children, className = '' }) => (
    <th className={`px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider ${className}`}>
        {children}
    </th>
);

const Body = ({ children }) => (
    <tbody className="divide-y divide-gray-200 bg-white">
        {children}
    </tbody>
);

const Row = ({ children, className = '' }) => (
    <tr className={`hover:bg-gray-50 transition-colors ${className}`}>
        {children}
    </tr>
);

const Cell = ({ children, className = '' }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}>
        {children}
    </td>
);

Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
