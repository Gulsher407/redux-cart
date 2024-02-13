import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

export default function App() {
  const { TotalQuantity } = useSelector((state) => state.allcart);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MDBNavbar light bgColor='light' className={isSticky ? 'sticky-top' : ''}>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <h6 style={{ margin: 0 }}>Gulsher Store</h6>
          <img src="./logo.png" alt="Mobile-Logo" style={{ width: '40px', height: '25px', marginLeft: '5px' }} />
        </MDBNavbarBrand>
        <span style={{ marginRight: '10px' }}>
          <Link to='/'>All Products</Link>
        </span>
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <MDBBtn color='dark' style={{ borderRadius: '2px', padding: '5px 10px' }}>
            Cart <span className="badge bg-danger">{TotalQuantity}</span>
          </MDBBtn>
        </Link>
      </MDBContainer>
    </MDBNavbar>
  );
}
