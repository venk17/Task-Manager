import { CheckSquare, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  actionHref, 
  onAction 
}) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <CheckSquare className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-8">
          {description}
        </p>
        {(actionHref || onAction) && (
          <div>
            {actionHref ? (
              <Link
                href={actionHref}
                className="btn-primary px-6 py-3 text-base font-medium inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {actionLabel}
              </Link>
            ) : (
              <button
                onClick={onAction}
                className="btn-secondary px-6 py-3 text-base font-medium"
              >
                {actionLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}