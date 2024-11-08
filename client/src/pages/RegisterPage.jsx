import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { register, reset } from "../features/auth/authSlice";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [re_password, setRePassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate("/");
			toast.success(
				"An activation email has been sent to your email address. Please check your email."
			);
		}

		dispatch(reset());
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== re_password) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				username,
				first_name,
				last_name,
				email,
				password,
				re_password,
			};
			dispatch(register(userData));
		}
	};

	return (
		<>
			<Title title="Register" />
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<Row className="w-100 justify-content-center">
					<Col md={8} lg={5}>
						<Card className="p-4 shadow-lg rounded">
							<section className="text-center mb-4">
								<h1 className="mb-3">
									<FaUser /> Register
								</h1>
								<hr className="hr-text" />
							</section>

							{isLoading && <Spinner />}
							<Form onSubmit={submitHandler}>
								<Form.Group controlId="username" className="mb-3">
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="first_name" className="mb-3">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter First Name"
										value={first_name}
										onChange={(e) => setFirstName(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="last_name" className="mb-3">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Last Name"
										value={last_name}
										onChange={(e) => setLastName(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="re_password" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										value={re_password}
										onChange={(e) => setRePassword(e.target.value)}
										required
									/>
								</Form.Group>

								<Button type="submit" variant="primary" className="w-100 mt-3">
									Sign Up
								</Button>
							</Form>

							<Row className="py-3 text-center">
								<Col>
									<p className="mb-0">
										Have an account already? <Link to="/login">Login</Link>
									</p>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RegisterPage;