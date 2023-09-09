import React from 'react';
import {
  Card, Col, Container, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCryptoHistory } from './CryptoSlice';

const CryptoExcerpt = () => {
  const cryptoMarkets = useSelector(selectCryptoHistory);

  const cryptoDataArray = [];

  if (cryptoMarkets) {
    cryptoMarkets.forEach((market) => {
      cryptoDataArray.push({
        exchange: market.exchange,
        pair: market.pair,
        pairPrice: market.pairPrice,
        price: market.price,
        volume: market.volume,
      });
    });
  }

  const formatNumber = (number) => new Intl.NumberFormat('en-US').format(number);

  return (
    <Container>
      <div>
        <h2 className="text-white fs-2 fw-bold">Market Prices across all exchanges </h2>
        <Container>
          <Row xs={1} className="g-2">
            {cryptoDataArray.map((market) => (
              <Col key={market.exchange}>
                <Card className="card2">
                  <Card.Body>
                    <Card.Text>
                      Exchange:
                      {market.exchange}
                    </Card.Text>
                    <h6>
                      Market exchange pair:
                      {market.pair}
                    </h6>
                    <p>
                      Pair Price:
                      {formatNumber(market.pairPrice)}
                    </p>
                    <p>
                      Price:
                      {formatNumber(market.price)}
                    </p>
                    <h6>
                      Volume:
                      {formatNumber(market.volume)}
                    </h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default CryptoExcerpt;
