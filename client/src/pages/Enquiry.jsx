import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { submitEnquiry, reset } from "../features/enquiry/enquirySlice.js";
import { toast } from "react-toastify";

const EnquiryPage = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  
  const { isLoading, isError, message: errorMessage } = useSelector(
    (state) => state.enquiry
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !phone_number || !email || !subject || !message) {
      toast.error("All fields are required");
      return;
    }

    const enquiryData = { name, phone_number, email, subject, message };
    dispatch(submitEnquiry(enquiryData));
  };

  const handleReset = () => {
    dispatch(reset());
    setName("");
    setPhoneNumber("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isError, errorMessage]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-lg">
            <h2 className="text-center mb-4">Submit Enquiry</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone_number" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="subject" className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter Subject"
                  required
                />
              </Form.Group>

              <Form.Group controlId="message" className="mb-4">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter Your Message"
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Enquiry"}
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EnquiryPage;