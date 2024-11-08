import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDetail } from "../features/properties/propertySlice";
import { Badge, Button, Card, Col, Row, Container } from "react-bootstrap";
import { FaBed, FaShower } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";

const PropertyDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Get property details from Redux store
  const { property, isLoading, isError, message } = useSelector(
    (state) => state.properties // Make sure to match 'property' here, not 'p'
  );

  useEffect(() => {
    // Dispatch action to get property details based on slug
    dispatch(getPropertyDetail(slug));
  }, [slug, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {message}</div>;

  if (!property) return <div>Property not found.</div>;

  return (
    <Container className="my-5">
      <Card>
        <Card.Img variant="top" src={property.cover_photo} />
        <Card.Body>
          <Badge bg="success">{property.advert_type}</Badge>
          <Card.Title as="h2">{property.title}</Card.Title>
          <h4 className="text-muted">${property.price}</h4>
          <Card.Text>{property.description}</Card.Text>

          <Row className="mt-3">
            <Col>
              <strong>Location:</strong> {property.city}, {property.country}
            </Col>
          </Row>

          <hr />

          <Row>
            <Col>
              <FaBed /> Bedrooms: {property.bedrooms}
            </Col>
            <Col>
              <FaShower /> Bathrooms: {property.bathrooms}
            </Col>
            <Col>
              <GiStairs /> Total Floors: {property.total_floors}
            </Col>
          </Row>

          <hr />

          <Row>
            <Col>
              <strong>Street Address:</strong> {property.street_address}
            </Col>
          </Row>

          <Link to="/enquiry">
            <Button variant="primary" className="mt-4">
              Contact Agent
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PropertyDetail;