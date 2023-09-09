import React, { useState } from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCryptoHistory,
  selectCryptoData,
} from '../redux/Crypto/CryptoSlice';

const Home = () => {
  const cryptoMeta = useSelector(selectCryptoData);
  const { coins } = cryptoMeta;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatNumber = (number) => new Intl.NumberFormat('en-US').format(number);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleClick = (id) => {
    dispatch(getCryptoHistory(id));
    navigate('/crypto');
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCoins = coins?.slice(startIndex, endIndex);

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      <div>
        <h4 className="text-white fs-3" htmlFor="itemsPerPage">
          Enter number of Items to display per page:
        </h4>
        <input
          type="number"
          id="itemsPerPage"
          value={itemsPerPage}
          onInput={handleItemsPerPageChange}
        />
      </div>
      <div className="pagination my-2">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= coins.length}
        >
          Next
        </button>
      </div>

      <Container>
        <Row xs={1} className="g-2">
          {filteredCoins?.map((crypto) => (
            <Col key={crypto.id} onClick={() => handleClick(crypto.id)}>
              <Card className="card">
                <Card.Body className="d-flex justify-content-between">
                  <Card.Img className="w-25" variant="top" src={crypto.icon} />
                  <Card.Title>{crypto.name}</Card.Title>
                </Card.Body>
                <Card.Body className="g-1">
                  <h2>
                    Price: $
                    {formatNumber(crypto.price)}
                  </h2>
                  <p>
                    Price change in 1 day:
                    {' '}
                    <strong>{crypto.priceChange1d}</strong>
                  </p>

                  <p>
                    Price change in 1 week:
                    {' '}
                    <strong>{crypto.priceChange1w}</strong>
                  </p>

                  <h6>
                    Market Cap
                    {formatNumber(crypto.marketCap)}
                  </h6>
                  <h6>
                    Total Supply
                    {formatNumber(crypto.totalSupply)}
                  </h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
