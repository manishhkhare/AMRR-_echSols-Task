import React, { useEffect, useState } from 'react';
import './ShowItems.css';
import { Close, X } from '@mui/icons-material';
import EnquireryBtn from './EnquireryBtn';

export default function ShowItems() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
   
  useEffect(() => {
    fetch('http://localhost:5000/api/getItems', { method: 'GET' })
      .then(res => res.json())
      .then(result => {
        if (result && result.data) {
          setItems(result.data);
        } else {
          setItems([]);
        }
     
      })
      .catch(err => {
        console.error('Error fetching items:', err);
        setItems([]);
        
      });
  }, []);
  
  const handleItemClick = (item) => {
    console.log(item)
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  }; 
  console.log(items)

  return (
    <div className='ShowItemsWrapper'>
     {items.map((item, index) => (
  <div className='cart' key={index} onClick={() => handleItemClick(item)}>
    <div className="w-100">
      <img
        src={`http://localhost:5000/uploads/${item.coverImage}`}
        alt={item.name}
        className="img-fluid"
      />
    </div>

    <div className="text-secondary fw-bold pt-3">{item.type}</div>
    <div className="fw-semibold">{item.name}</div>

    <div className="mt-auto text-end">
      <EnquireryBtn item={item} />
    </div>
  </div>
))}
 
     { items.length == 0 && <div className='d-flex justify-content-center align-items-center fs-2 '>No Items..</div>}

{selectedItem && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={handleCloseModal}><Close/></button>
         
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    {selectedItem.Images.map((img, idx) => (
      <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
        <img
          className="d-block w-100"
          src={`http://localhost:5000/uploads/${img}`}
          alt={`Slide ${idx}`}
        />
      </div>
    ))}
  </div>

  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon " aria-hidden="true" />
    <span className="visually-hidden"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden"></span>
  </button>
</div>

   <h5>{selectedItem.name}</h5>
      <div className='description'>
      <p className="mt-2 ">{selectedItem.description}</p>  </div>
    </div>
  </div>
      )}

    </div>
  );
}
