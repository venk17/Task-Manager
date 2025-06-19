import { useState, useEffect } from 'react';
import { Plus, Search, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.data);
        setError(null);
      } else {
        throw new Error(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
      } else {
        throw new Error(data.error || 'Failed to delete task');
      }
    } catch (err) {
      alert('Error deleting task: ' + err.message);
    }
  };

  // Filter and search tasks
  useEffect(() => {
    let filtered = tasks;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, statusFilter, searchTerm]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
            </div>
            <Link
              href="/add"
              className="btn-primary px-6 py-3 text-sm font-medium rounded-lg inline-flex items-center gap-2 hover:scale-105 transform transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add New Task
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">To Do</p>
                <p className="text-3xl font-bold text-gray-500">{stats.todo}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-warning-600">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-warning-100 rounded-full">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-success-600">{stats.done}</p>
              </div>
              <div className="p-3 bg-success-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <TaskFilters
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
              />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-error-600" />
              <p className="text-error-800 font-medium">Error loading tasks</p>
            </div>
            <p className="text-error-600 mt-1">{error}</p>
            <button
              onClick={fetchTasks}
              className="btn-error px-4 py-2 text-sm mt-3"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            title={searchTerm || statusFilter !== 'all' ? 'No tasks found' : 'No tasks yet'}
            description={
              searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first task to get started'
            }
            actionLabel={searchTerm || statusFilter !== 'all' ? 'Clear filters' : 'Add Task'}
            onAction={
              searchTerm || statusFilter !== 'all'
                ? () => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }
                : null
            }
            actionHref={searchTerm || statusFilter !== 'all' ? null : '/add'}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}