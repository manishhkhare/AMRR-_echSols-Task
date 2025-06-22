import React, { useState } from 'react';
import './AddItems.css';

export default function AddItems() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemType: '',
    itemDescription: '',
    coverImage: null,
    additionalImages: []
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (id === 'coverImage') {
      setFormData(prev => ({ ...prev, coverImage: files[0] }));
    } else if (id === 'additionalImages') {
      setFormData(prev => ({ ...prev, additionalImages: [...files] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('itemName', formData.itemName);
    data.append('itemType', formData.itemType);
    data.append('itemDescription', formData.itemDescription);
    data.append('coverImage', formData.coverImage);

    formData.additionalImages.forEach((file) => {
      data.append('additionalImages', file);
    });

      await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setSuccess(true);
        setFormData({
          itemName: '',
          itemType: '',
          itemDescription: '',
          coverImage: null,
          additionalImages: []
        });
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(err => {
        console.error('Upload error:', err);
      });
  };

  return (
    <div className='addItems'>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Add New Item</h2>
        <form id="itemForm" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Item Name</label>
            <input type="text" className="form-control" id="itemName" value={formData.itemName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="itemType" className="form-label">Item Type</label>
            <select className="form-select" id="itemType" value={formData.itemType} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="shoes">Shoes</option>
              <option value="gear">Sports Gear</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="itemDescription" className="form-label">Item Description</label>
            <textarea className="form-control" id="itemDescription" rows={4} value={formData.itemDescription} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="coverImage" className="form-label">Item Cover Image</label>
            <input className="form-control" type="file" id="coverImage" accept="image/*" onChange={handleFileChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="additionalImages" className="form-label">Additional Images</label>
            <input className="form-control" type="file" id="additionalImages" multiple accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{
            backgroundColor:"#1E1E2F"
          }}>Add Item</button>
        </form>

        {success && (
          <div id="successMessage" className="alert alert-success mt-3" role="alert">
            Item successfully added!
          </div>
        )}
      </div>
    </div>
  );
}
