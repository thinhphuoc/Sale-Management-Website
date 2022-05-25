import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import {Button, Container} from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Store.css'
import {BsFillCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs'

const Store = (props) => {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)

	async function fetchProducts(page) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/products?page=${page}`
		)
		res.json()
			.then((res) => setProducts(res))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		fetchProducts(page)
	}, [page])

	function handleLeft() {
		if (page === 1) return
		setPage(page - 1)
	}

	function handleRight() {
		if (page === 3) return
		setPage(page + 1)
	}

	return (
		<Container>
			<Row>
				<Col>
					<Button
						inline="true"
						onClick={handleRight}
						style={{
							background: '#03396a',
							position: 'relative',
							float: 'right',
						}}
						className="navArrow">
						<BsFillCaretRightFill style={{size: '30px'}} />
					</Button>
					<Button
						inline="true"
						onClick={handleLeft}
						style={{
							background: '#03396a',
							position: 'relative',
							float: 'right',
						}}
						className="navArrow">
						<BsFillCaretLeftFill style={{size: '30px'}} />
					</Button>
				</Col>
			</Row>
			<Row>
				{products.map((product) => (
					<Col xs="3" key={product.id}>
						<div className="wholeCard">
							<Card style={{width: '20vw', height: '450px'}}>
								<Card.Img
									variant="top"
									src={`${process.env.REACT_APP_API_URL}/products/img/${product.id}`}
									className="imgSize"
								/>
								<Card.Body className="cardProductInfo">
									<Card.Text>{product.id}</Card.Text>
									<Card.Text>{product.name}</Card.Text>
									<Card.Text>{product.price}</Card.Text>
								</Card.Body>
							</Card>
						</div>
					</Col>
				))}
			</Row>
		</Container>
	)
}

export default Store
