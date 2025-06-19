import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Save, ArrowLeft, Calendar, FileText, Flag } from 'lucide-react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import LoadingButton from '../../components/LoadingButton';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch task data
  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        setPageLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
        const data = await response.json();
        
        if (data.success) {
          const task = data.data;
          setFormData({
            title: task.title || '',
            description: task.description || '',
            status: task.status || 'todo',
            dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
          });
        } else {
          throw new Error(data.error || 'Task not found');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
        alert('Error loading task: ' + error.message);
        router.push('/');
      } finally {
        setPageLoading(false);
      }
    };

    fetchTask();
  }, [id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          status: formData.status,
          dueDate: formData.dueDate || null,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push('/');
      } else {
        throw new Error(data.error || 'Failed to update task');
      }
    } catch (error) {
      alert('Error updating task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
          <p className="text-gray-600 mt-1">Update your task details</p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`input ${errors.title ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
                placeholder="Enter task title..."
              />
              {errors.title && (
                <p className="mt-2 text-sm text-error-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="input resize-none"
                placeholder="Add task description (optional)..."
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                <Flag className="w-4 h-4 inline mr-2" />
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="input"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className={`input ${errors.dueDate ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
              />
              {errors.dueDate && (
                <p className="mt-2 text-sm text-error-600">{errors.dueDate}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <LoadingButton
                type="submit"
                loading={loading}
                className="btn-primary flex-1 py-3 text-base font-medium"
                icon={<Save className="w-5 h-5" />}
              >
                Update Task
              </LoadingButton>
              <Link
                href="/"
                className="btn-secondary px-6 py-3 text-base font-medium"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}