import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all items
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data.data || []);
    } catch (err) {
      setError('Failed to fetch items. Make sure the backend server is running.');
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create new item
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '' });
        fetchItems();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create item');
      }
    } catch (err) {
      console.error('Error creating item:', err);
      alert('Failed to create item');
    }
  };

  // Update existing item
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '' });
        setEditingId(null);
        fetchItems();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update item');
      }
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item');
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchItems();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item');
    }
  };

  // Start editing an item
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description || ''
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📝 CRUD Application</h1>
        <p className="subtitle">Full-stack application with React & Express</p>

        {/* Form Section */}
        <div className="form-container">
          <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
          <form onSubmit={editingId ? handleUpdate : handleCreate}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter item description"
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Create'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Items List Section */}
        <div className="items-container">
          <h2>Items List</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading">Loading...</div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <p>No items yet. Create your first item above!</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="item-id">ID: {item.id}</span>
                  </div>
                  <p className="item-description">
                    {item.description || 'No description'}
                  </p>
                  <div className="item-footer">
                    <small>Created: {new Date(item.created_at).toLocaleString()}</small>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="btn btn-edit" 
                      onClick={() => handleEdit(item)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
