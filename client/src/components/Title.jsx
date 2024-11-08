import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ title = "Welcome to Real Estate", description = "We sell the best properties in town", keywords = "land, real estate, best value" }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

export default Title;