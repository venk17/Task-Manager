export default function TaskFilters({ statusFilter, onStatusFilterChange }) {
  const filters = [
    { value: 'all', label: 'All Tasks', color: 'gray' },
    { value: 'todo', label: 'To Do', color: 'gray' },
    { value: 'in_progress', label: 'In Progress', color: 'warning' },
    { value: 'done', label: 'Completed', color: 'success' }
  ];

  const getFilterClass = (filter, isActive) => {
    const baseClass = "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200";
    
    if (isActive) {
      switch (filter.color) {
        case 'warning':
          return `${baseClass} bg-warning-100 text-warning-800 border border-warning-200`;
        case 'success':
          return `${baseClass} bg-success-100 text-success-800 border border-success-200`;
        default:
          return `${baseClass} bg-primary-100 text-primary-800 border border-primary-200`;
      }
    }
    
    return `${baseClass} text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onStatusFilterChange(filter.value)}
          className={getFilterClass(filter, statusFilter === filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}