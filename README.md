# Real Estate Application

This is a full-stack web application built using Django for the backend and React for the frontend. It provides functionalities for managing properties, user profiles, and enquiries for a real estate platform.

## Technologies Used

### Backend:
- **Django 5.1.3**: The backend framework for handling requests, authentication, and database management.
- **Django Rest Framework**: To create RESTful APIs.
- **Django CORS Headers**: For handling cross-origin requests.
- **Djoser**: For handling user authentication and JWT-based authentication.
- **PostgreSQL**: For the database.
- **Pillow**: For image handling.
- **PyJWT**: For JSON Web Token authentication.

### Frontend:
- **React 18.3.1**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation.
- **Redux**: State management.
- **React Toastify**: For showing notifications in the application.
- **Bootstrap 5.3.3**: For styling and layout.

## Features

- **User Authentication**: Login, registration, and JWT authentication.
- **Property Management**: View and interact with real estate properties.
- **Profile Management**: User profile management with the ability to update information.
- **Enquiries**: Users can make enquiries about properties.
- **Responsive Design**: The app is fully responsive using Bootstrap.

### Screenshots

#### Home Page
![Screenshot 2024-11-09 at 8 49 59 AM](https://github.com/user-attachments/assets/10bb57c6-dad5-4727-8ebc-7e12a715ca55)

#### Property Listing
![Screenshot 2024-11-09 at 8 50 16 AM](https://github.com/user-attachments/assets/f29de405-cb59-4b7a-b059-494b41a3ec68)

#### Property Detail Page
![Screenshot 2024-11-09 at 10 09 25 AM](https://github.com/user-attachments/assets/965481e1-8cf4-4d9c-ad10-7d450f78e457)

#### User Profile
![Screenshot 2024-11-09 at 8 50 58 AM](https://github.com/user-attachments/assets/21156dda-5bed-40f3-b054-fbf903b49027)

#### Enquiry Form
![Screenshot 2024-11-09 at 8 50 21 AM](https://github.com/user-attachments/assets/f784438e-20bb-4bbb-9fbf-d8c990a015da) 

#### 404 Page
![Screenshot 2024-11-09 at 10 10 41 AM](https://github.com/user-attachments/assets/a29ec052-6ecb-4a5c-ac08-a14ee4105b31)

#### Admin Panel
![Screenshot 2024-11-09 at 10 11 34 AM](https://github.com/user-attachments/assets/8dde90bc-aced-4b1a-b35d-6f8482704ed4)

#### API Browsable Interface (DRF)
![Screenshot 2024-11-09 at 9 54 44 AM](https://github.com/user-attachments/assets/0ae35fb5-1826-44b6-8cee-0f7a90046e96)
![Screenshot 2024-11-09 at 9 54 52 AM](https://github.com/user-attachments/assets/aca7f485-461b-4fee-89ba-e5a3bb9ea241)
![Screenshot 2024-11-09 at 9 54 56 AM](https://github.com/user-attachments/assets/8d5977b9-4f9e-4637-99ca-cd136e48ded8)
![Screenshot 2024-11-09 at 9 55 05 AM](https://github.com/user-attachments/assets/2874bd3e-cb6b-4c4d-a959-5b655ab69418)

## Setup and Installation

### Backend Setup (Django)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-link.git
   cd backend
    ```
2.	Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3.	Setup environment variables:
    ```bash
    Create a .env file and configure your settings (database, secret keys, etc.).
    ```
4.	Run migrations:
    ```bash
    python manage.py migrate
    ```

5.	Create a superuser:
    ```bash
    python manage.py createsuperuser
    ```

6.	Start the Django development server:
    ```bash
    python manage.py runserver
    ```


### Frontend Setup (React)

1.	Clone the repository:
    ```bash
    git clone https://github.com/your-repo-link.git
    cd frontend
    ```

2.	Install dependencies:
    ```bash
    npm install
    ```

3.	Start the React development server:
    ```bash
    npm run dev
    ```
The frontend will be available at http://localhost:5173.

### API Endpoints

##### Authentication (Authorization Required: No for registration, Yes for token generation)

	•POST /api/v1/auth/: User registration (No authentication required)
	•POST /api/v1/auth/jwt/create/: Obtain JWT token for authentication (Requires user credentials for login)

##### Properties

	•GET /api/v1/properties/: List all properties (Authentication required for authorized users)
	•GET /api/v1/properties/{slug}/: View details of a specific property (Authentication required for authorized users)

##### Profile (Authorization Required: Yes for both viewing and updating)

	•GET /api/v1/profile/: View user profile (Authentication required)
	•PUT /api/v1/profile/: Update user profile (Authentication required)

##### Enquiries

	•POST /api/v1/enquiries/: Create a new enquiry about a property (Authentication required)

### Folder Structure


	•real_state: Contains all Django-related files, including models, views, and serializers.
	•apps: Contains all Django apps (profiles, properties, enquiries).
	•requirements.txt: List of Python dependencies.
	•frontend: Contains all React-related files, including components, pages, and routing setup.
	•src: Source folder containing React components and pages.
	•package.json: List of Node.js dependencies.

### Acknowledgments

	•Inspiration from various real estate platforms.
	•Bootstrap for styling.
	•React and Django for full-stack development.
