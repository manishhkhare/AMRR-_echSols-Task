import React from 'react'

export default function EnquireryBtn({item}) {
    const handleClick =  async (e) => {
        e.stopPropagation();
        console.log('Sending email for:', item.name);
      alert(`Enquiry sent for ${item.name}`);
       await fetch('http://localhost:5000/api/enquire', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemName: item.name })
  });
      };
    return (
        <button className="btn btn-outline-primary " onClick={handleClick}>
        Enquire
      </button>
    )
}
