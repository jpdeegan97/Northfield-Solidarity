import { useState, useMemo } from 'react';
import { Filter, RotateCcw, Network } from 'lucide-react';
import ReusableTable from './ReusableTable';

const mockVersionHistory = [
    {
        id: '1',
        version: 'v4.2',
        executionId: 'EXE-20241210-001',
        changeType: 'Major Revision',
        approvalStatus: 'Approved',
        publishedDate: '2024-12-10',
        notes: 'Updated critical parameters'
    }
];

export default function SOPVersionHistory() {
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortedHistory = useMemo(() => {
        const data = [...mockVersionHistory];
        if (!sortConfig) return data;

        return data.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortConfig]);

    const paginatedHistory = sortedHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1>SOP Version History</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ReusableTable
                    columns={[
                        { key: 'version', label: 'Version', sortable: true },
                        { key: 'executionId', label: 'Execution ID' },
                        { key: 'approvalStatus', label: 'Approval' }
                    ]}
                    data={paginatedHistory}
                    onSort={handleSort}
                />
            </div>
        </div>
    );
}