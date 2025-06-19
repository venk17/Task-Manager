import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TaskCard({ task, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-4 h-4 text-success-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-warning-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'done':
        return 'status-done';
      case 'in_progress':
        return 'status-in-progress';
      default:
        return 'status-todo';
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && task.status !== 'done';
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0 && task.status !== 'done';
  };

  return (
    <div className="card-hover p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon(task.status)}
          <span className={getStatusClass(task.status)}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/edit/${task.id}`}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200 disabled:opacity-50"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span 
            className={`
              ${isOverdue(task.dueDate) ? 'text-error-600 font-medium' : ''}
              ${isDueSoon(task.dueDate) ? 'text-warning-600 font-medium' : ''}
              ${!isOverdue(task.dueDate) && !isDueSoon(task.dueDate) ? 'text-gray-600' : ''}
            `}
          >
            {formatDate(task.dueDate)}
            {isOverdue(task.dueDate) && ' (Overdue)'}
            {isDueSoon(task.dueDate) && ' (Due Soon)'}
          </span>
        </div>
      )}

      {/* Created Date */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Created {formatDate(task.createdAt)}
        </p>
      </div>
    </div>
  );
}