 RAPUDO'S ECOMMERCE.

 This is a simple online shopping store. 

An online shopping platform where users can browse products, add them to a cart, and checkout. The backend is powered by Express.js, serving a mock database (`db.json`), while the frontend is built with HTML, CSS, and JavaScript.

 Features

- Product Listing: Fetches products from `db.json` and displays them dynamically.
- Cart Management: Users can add or remove products from the cart.
- Discount System: Applies discounts based on total price and cart size.
- Dark Mode: Toggle between light and dark themes.
- earch Functionality: Users can search for products in real-time.
- Checkout System: Alerts users on checkout completion.

Project Structure

.
├── public
│   ├── Images
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── db.json
├── package.json
├── package-lock.json
├── README.md
└── server.js


Installation

 1.Clone the Repository

   git clone https://github.com/your-username/Ecommerce.git
   cd Ecommerce


 2.Install Dependencies.

   npm install


 3.Start the Server.

   node server.js

   By default, the backend runs on `http://localhost:3000/`.

 4.Open the Frontend

   Open `public/index.html` in your browser or start a simple local server.

  npx serve public


Deploying on Render

  1. Create a Render Account
      Sign up on [Render](https://render.com/) and log in.

  2. Create a New Web Service
     - Click New → Web Service.
    - Connect your GitHub repository
    - Choose Node.js environment

  3. Configure Deployment
    - Build Command: `npm install`
    - Start Command: `node server.js`
    - Environment Variables: Set any required environment        variables.

  4. Deploy
     Click Deploy, and Render will build and host your app.

  5. Access Your App.
        Once deployed, your app will be available at a URL like:

        https://your-app-name.onrender.com


Contributing.

    Feel free to contribute by forking the repository and submitting a pull request!



