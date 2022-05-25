import React, { useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import QrReader from "react-qr-scanner";
import "../styles/Home.css";

function Home() {
  const [table, setTable] = useState([]);

  async function add_new_product(state, product_id) {
    let k = state.findIndex((x) => x.id === product_id);
    if (k >= 0) {
      setTable(
        state.map((y) =>
          y.id === product_id
            ? {
                ...y,
                quantity: y.quantity + 1,
              }
            : y
        )
      );
    } else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/${product_id}`
      );
      res
        .json()
        .then((res) =>
          setTable([
            ...state,
            {
              id: product_id,
              product_name: res.name,
              unit_price: res.price,
              quantity: 1,
            },
          ])
        )
        .catch((err) => console.log(err));
    }
  }

  const handleScan = (data) => {
    if (data) {
      add_new_product(table, data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  async function handleOnClick() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_email: 'hoanglong@gmail.com',
        items: table
      }),
    });
    res
      .json()
      .then((res) => {
        console.log(res);
        setTable([]);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <div>
              <QrReader
                className="qrBox"
                delay={2000}
                onError={handleError}
                onScan={handleScan}
              />
            </div>
          </Row>
          <Row>
            <div>
              <Button
                className="sellButton"
                variant="primary"
                style={{ background: "#015c94", width: "350px" }}
                onClick={handleOnClick}
                disabled={table === undefined || table.length === 0}
              >
                Sell
              </Button>
            </div>
          </Row>
        </Col>
        <Col>
          <Table
            striped
            bordered
            hover
            className="table"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th className="tableHeader" style={{ background: "#E9F2F9" }}>
                  ID
                </th>
                <th className="tableHeader" style={{ background: "#E9F2F9" }}>
                  Product name
                </th>
                <th className="tableHeader" style={{ background: "#E9F2F9" }}>
                  Unit price
                </th>
                <th className="tableHeader" style={{ background: "#E9F2F9" }}>
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.product_name}</td>
                  <td>{row.unit_price}</td>
                  <td>{row.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
