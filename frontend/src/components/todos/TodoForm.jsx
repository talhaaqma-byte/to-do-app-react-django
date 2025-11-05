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
    due_datetime: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (todo) {
      const dueDateTime = todo.due_datetime ? todo.due_datetime.split('T') : [null, null];
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        priority: todo.priority || 'medium',
        due_date: dueDateTime[0] || (todo.due_date ? todo.due_date.split('T')[0] : ''),
        due_datetime: dueDateTime[1] ? dueDateTime[1].substring(0, 5) : '',
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

    let submitData = {
      ...formData,
      description: formData.description || null,
    };

    // Combine date and time into due_datetime if both are provided
    if (formData.due_date && formData.due_datetime) {
      submitData.due_datetime = `${formData.due_date}T${formData.due_datetime}:00`;
      submitData.due_date = formData.due_date;
    } else if (formData.due_date) {
      submitData.due_date = formData.due_date;
      submitData.due_datetime = null;
    } else {
      submitData.due_date = null;
      submitData.due_datetime = null;
    }

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
          <label className="input-label">Task Date</label>
          <input
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
            className="input-field"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {formData.due_date && (
        <div className="form-group">
          <label className="input-label">Task Time</label>
          <input
            name="due_datetime"
            type="time"
            value={formData.due_datetime}
            onChange={handleChange}
            className="input-field"
          />
          <small className="form-help-text">You will receive an email reminder at this time</small>
        </div>
      )}

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

