import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDetail } from "../features/properties/propertySlice";
import { Badge, Button, Card, Col, Row, Container } from "react-bootstrap";
import { FaBed, FaShower } from "react-icons/fa";
import { GiStairs } from "react-icons/gi";
import { FiMapPin } from "react-icons/fi";

const PropertyDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  // Get property details from Redux store
  const { property, isLoading, isError, message } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    // Dispatch action to get property details based on slug
    dispatch(getPropertyDetail(slug));
  }, [slug, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {message}</div>;

  if (!property) return <div>Property not found.</div>;

  // Create an array of property images, excluding null values
  const propertyImages = [
    property.cover_photo,
    property.photo1,
    property.photo2,
    property.photo3,
    property.photo4,
  ].filter((photo) => photo); // Removes null or undefined photo fields

  return (
    <Container className="mt-5 my-4">
      <Card className="shadow-lg rounded">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Badge bg="success" className="text-uppercase">
              {property.advert_type}
            </Badge>
            <h4 className="text-muted">${property.price}</h4>
          </div>
          <Card.Title as="h3" className="font-weight-bold">{property.title}</Card.Title>
          
          <Card.Text className="text-muted">{property.description}</Card.Text>

          {/* Property Details - Grid with images and info */}
          <Row className="d-flex flex-wrap justify-content-center mt-4">
            <Col xs={12} sm={6} md={4} className="mb-3">
              <Card.Img
                variant="top"
                src={property.cover_photo}
                alt="Property Cover"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Col>

            {/* Other images */}
            {propertyImages.slice(1).map((photo, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="mb-3">
                <Card.Img
                  variant="top"
                  src={photo}
                  alt={`Property Image ${index + 1}`}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Col>
            ))}
          </Row>

          <Row className="mt-3">
            <Col xs={12} sm={6} md={4}>
              <strong>Location:</strong>{" "}
              <FiMapPin /> {property.city}, {property.country}
            </Col>
            <Col xs={12} sm={6} md={4}>
              <strong>Street Address:</strong>{" "}
              {property.street_address}
            </Col>
          </Row>

          <hr />

          <Row className="mt-3">
            <Col xs={12} sm={4} className="text-center">
              <FaBed size={20} /> <strong>{property.bedrooms}</strong> Bedrooms
            </Col>
            <Col xs={12} sm={4} className="text-center">
              <FaShower size={20} /> <strong>{property.bathrooms}</strong> Bathrooms
            </Col>
            <Col xs={12} sm={4} className="text-center">
              <GiStairs size={20} /> <strong>{property.total_floors}</strong> Floors
            </Col>
          </Row>

          <hr />

          <Row className="mt-3">
            <Col xs={12} sm={6}>
              <strong>Ref Code:</strong> {property.ref_code}
            </Col>
            <Col xs={12} sm={6}>
              <strong>Postal Code:</strong> {property.postal_code}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} sm={6}>
              <strong>Property Number:</strong> {property.property_number}
            </Col>
            <Col xs={12} sm={6}>
              <strong>Tax:</strong> ${property.tax}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} sm={6}>
              <strong>Final Price:</strong> ${property.final_property_price}
            </Col>
            <Col xs={12} sm={6}>
              <strong>Plot Area:</strong> {property.plot_area} sq ft
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs={12} sm={6}>
              <strong>Property Type:</strong> {property.property_type}
            </Col>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Link to="/enquiry">
              <Button variant="success" size="lg" className="px-5 py-3">
                Enquire Now
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PropertyDetail;