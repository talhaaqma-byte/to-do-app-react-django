import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '../common/Input';
import Button from '../common/Button';
import './TodoForm.css';

const TodoForm = ({ todo, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        due_date: todo.due_date ? todo.due_date.split('T')[0] : '',
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      due_date: formData.due_date || null,
      description: formData.description || null,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <Input
        label="Title *"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="Enter todo title"
        maxLength={200}
      />

      <div className="form-group">
        <label className="input-label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description (optional)"
          className="textarea-field"
          rows={4}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="input-label">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="select-field"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="input-label">Due Date</label>
          <input
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {todo ? 'Update' : 'Create'} Todo
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;

