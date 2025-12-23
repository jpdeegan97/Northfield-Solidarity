import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Calendar, Filter, RotateCcw } from 'lucide-react';
import ReusableTable from './ReusableTable';

const mockComponentChanges = [
    {
        id: '1',
        componentId: 'COMP-2847',
        previousVersion: 'v2.1',
        newVersion: 'v2.2',
        changeType: 'Parameter Update',
        materiality: 'High',
        rationale:
            'Updated temperature threshold from 85°C to 90°C based on new equipment specifications.'
    },
    {
        id: '2',
        componentId: 'COMP-1923',
        previousVersion: 'v1.5',
        newVersion: 'v1.6',
        changeType: 'Step Addition',
        materiality: 'Medium',
        rationale:
            'Added verification step for pressure calibration.'
    }
];

const mockSOPUpdates = [
    {
        id: '1',
        sopId: 'SOP-1042',
        version: 'v4.2',
        changeType: 'Major Revision',
        approvalStatus: 'Approved',
        publishedDate: '2024-12-10'
    }
];

export default function ExecutionAuditTrail() {
    const [filters, setFilters] = useState({
        dateRange: '',
        triggerType: 'All',
        executorRole: 'All',
        materialityLevel: 'All'
    });

    const [expandedRows, setExpandedRows] = useState(new Set());
    const [sortConfig, setSortConfig] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const toggleRow = (id) => {
        const next = new Set(expandedRows);
        next.has(id) ? next.delete(id) : next.add(id);
        setExpandedRows(next);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortedChanges = useMemo(() => {
        const data = [...mockComponentChanges];
        if (!sortConfig) return data;

        return data.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortConfig]);

    const paginatedChanges = sortedChanges.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="mb-4">Execution Audit Trail</h1>
                <p className="text-gray-600">
                    Displays GGE execution-level audit events.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ReusableTable
                  columns={[
                    { key: 'componentId', label: 'Component ID', sortable: true },
                    { key: 'changeType', label: 'Change Type' },
                    { key: 'materiality', label: 'Materiality' },
                    {
                      key: 'rationale',
                      label: 'Rationale',
                      render: (row) => (
                        <>
                          <button
                            onClick={() => toggleRow(row.id)}
                            className="text-[#007AFF]"
                          >
                            {expandedRows.has(row.id) ? 'Hide' : 'Show'}
                          </button>
                          {expandedRows.has(row.id) && (
                            <div className="mt-2 text-gray-700">{row.rationale}</div>
                          )}
                        </>
                      )
                    }
                  ]}
                  data={paginatedChanges}
                  onSort={handleSort}
                />
            </div>
        </div>
    );
}