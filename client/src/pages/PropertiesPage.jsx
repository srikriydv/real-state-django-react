import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Property from "../components/Property";
import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { getProperties } from "../features/properties/propertySlice";

const PropertiesPage = () => {
	const { properties, isLoading, isError, message } = useSelector(
		(state) => state.properties
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getProperties());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Title title="Our Properties Catalog" />
			<Container className="py-5 mt-5">
				<Row className="text-center mb-4">
					<Col>
						<h1 className="display-4 fw-bold text-success">Our Property Catalog</h1>
						<p className="text-muted">Discover a variety of properties to suit your needs.</p>
						<hr className="mx-auto" style={{ width: "60px", height: "3px", backgroundColor: "#0d6efd" }} />
					</Col>
				</Row>

				<Row className="mt-4 g-4">
					{properties.map((property) => (
						<Col key={property.id} sm={12} md={6} lg={4} xl={3} className="d-flex align-items-stretch">
							<Property property={property} />
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default PropertiesPage;