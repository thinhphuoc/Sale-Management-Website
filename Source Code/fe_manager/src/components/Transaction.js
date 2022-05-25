import React from 'react'
import {Button, Table, Container, Row, Col} from 'react-bootstrap'
import '../styles/Transaction.css'
import '../styles/Constants.css'
import {useEffect, useState} from 'react'
import {BsFillGearFill} from 'react-icons/bs'
import {BsFillCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs'

function getDateAndTime(string) {
	string = string.split(' ')
	return string
}

function getDate(string) {
	var date = ''
	for (var i = 0; i < 4; i++) date += getDateAndTime(string)[i] + ' '
	return date
}

function getTime(string) {
	return getDateAndTime(string)[4] + ' ' + getDateAndTime(string)[5]
}

function getTotal(items) {
	var sum = 0
	for (var i = 0; i < items.length; i++)
		sum += items[i].price * items[i].quantity
	return sum
}

const request = (id, params, method = 'GET') => {
	var url = `${process.env.REACT_APP_API_URL}/transactions/${id}`
	return fetch(url, {
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({status: params}),
	})
}

const put = (id, params) => request(id, params, 'PUT')

function Transaction() {
	const [transactions, setTransactions] = useState([])
	const [page, setPage] = useState(1)

	async function fetchTransactions(page) {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/transactions?page=${page}`
		)
		res.json()
			.then((res) => setTransactions(res))
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		fetchTransactions(page)
	}, [page])

	function handleLeft() {
		if (page === 1) return
		setPage(page - 1)
	}

	function handleRight() {
		if (page === 3) return
		setPage(page + 1)
	}

	async function handleEdit(id) {
		let tr = transactions.map((obj) => ({...obj}))
		for (var i = 0; i < tr.length; i++) {
			if (tr[i].transaction_id === id) {
				if (tr[i].status === 'success') tr[i].status = 'refunded'
				else tr[i].status = 'success'
				put(id, tr[i].status)
					.then((response) => {
						console.log(response)
					})
					.catch((error) => console.error('Error:', error))
				break
			}
		}
		setTransactions(tr)
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
			<Row className="Transaction-table">
				<Table striped bordered hover className="Transaction-table">
					<thead>
						<tr>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								ID
							</th>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								Date
							</th>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								Time
							</th>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								Total Price
							</th>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								Status
							</th>
							<th
								className="tableHeader"
								style={{background: '#E9F2F9'}}>
								Edit
							</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((row) => (
							<tr key={row.transaction_id}>
								<td>{row.transaction_id}</td>
								<td>{getDate(row.created_time)}</td>
								<td>{getTime(row.created_time)}</td>
								<td>{getTotal(row.items)}</td>
								<td>{row.status}</td>
								<td>
									<Button
										className="editStatusButton"
										onClick={() =>
											handleEdit(row.transaction_id)
										}
										style={{
											background: 'transparent',
											border: 0,
										}}>
										<BsFillGearFill
											style={{
												background: 'transparent',
												color: 'black',
											}}
										/>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Row>
		</Container>
	)
}

export default Transaction
