import Table from '@/Components/Table';

/**
 * Baris "belum ada data" yang membentang selebar kolom tabel.
 */
export default function EmptyRow({ colSpan, message }) {
    return (
        <Table.Row>
            <Table.Cell className="text-center text-gray-500 py-8" colSpan={colSpan}>
                {message}
            </Table.Cell>
        </Table.Row>
    );
}
