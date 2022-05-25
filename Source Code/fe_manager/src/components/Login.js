import React from 'react'
import login from './assets/login.jpg'
import '../styles/Login.css'
import {Form, Button, Container} from 'react-bootstrap'
import {useState} from 'react'

var url = `${process.env.REACT_APP_API_URL}/login`
const request = (url, params = {}, method = 'GET') => {
    return fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
}

const get = (url, params) => request(url, params, 'GET')
const post = (url, params) => request(url, params, 'POST')

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const validateForm = () => {
        return username.length > 0 && password.length > 0
    }
    const ProtectedComponent = (status) => {
        if (status === 200) {
            window.location = '../'
            return
        }
        alert('Login unsuccessfully')
    }

    function handleSubmit(event) {
        post(url, {username, password})
            .then((response) => {
                console.log(response.status)
                ProtectedComponent(response.status)
            })
            .catch((error) => console.error('Error:', error))
        event.preventDefault()
    }

    return (
        <Container fluid className="alignBox">
            <Form className="Login-form" onSubmit={handleSubmit}>
                <h3 id="Login-label"> Log in to Mr. Manager</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="formBox">Username</Form.Label>
                    <Form.Control
                        className="formBox"
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Text className="formBox">
                        We'll never share your account with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="formBox">Password</Form.Label>
                    <Form.Control
                        className="formBox"
                        type="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button
                    className="Login-button"
                    variant="primary"
                    type="submit"
                    style={{background: '#015c94'}}
                    disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            <img src={login} className="Login-logo" alt=""></img>
        </Container>
    )
}

export default Login
