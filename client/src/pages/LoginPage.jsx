import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { login, reset } from "../features/auth/authSlice";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		}

		dispatch(reset());
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email) {
			toast.error("An email must be provided");
		}

		if (!password) {
			toast.error("A password must be provided");
		}

		const userData = { email, password };
		dispatch(login(userData));
	};

	return (
		<>
			<Title title="login" />
			<Container className="d-flex justify-content-center align-items-center vh-100">
				<Row className="w-100 justify-content-center">
					<Col md={8} lg={5}>
						<Card className="p-4 shadow-lg rounded">
							<section className="text-center mb-4">
								<h1 className="mb-3">
									<FaSignInAlt /> Login
								</h1>
								<hr className="hr-text" />
							</section>

							{isLoading && <Spinner />}
							<Form onSubmit={submitHandler}>
								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										required
									/>
								</Form.Group>

								<Button
									type="submit"
									variant="primary"
									className="w-100 mt-3"
								>
									Sign In
								</Button>
							</Form>

							<Row className="py-3 text-center">
								<Col>
									<p className="mb-0">
										New Customer?{" "}
										<Link to="/register">
											Register Here
										</Link>
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

export default LoginPage;