# ISV Shop

Hello! This e-commerce website was created by Ignacio Sebastián Veiga, in the context of a React.js course at Coderhouse (Argentina, 2022).

## App and Item List

The app is an e-commerce SPA created with React JS in which you can buy mock products from an item list that can be filtered by category from the NavBar.  
You can also access an item's detail page clicking on the detail button to read more information and buy it from there.  
To add to the cart, you simply have to select the quantity with the counter in the item's card or detail and click on the button below. You can only add as many items as there are in stock at the moment in the firestore database from which the app fetches the data.

## Cart and Ordering

You can click on the cart widget at the top-right of the page and go to a view of your cart. If the cart is empty, you'll only see a message and a return button, otherwise you'll see a detail of the items in your order and you'll be able to modify their quantities, remove items, fill in a form with your personal information and finally make the order. As it is a mock proyect, no credit card or payment method is required by the form, and we encourage that you do not submit sensible data on it besides a name, an email and a telephone number. Service quantities cannot be changed, since the service fee covers only the initial consultation and the budget is developed when the engineer meets the client and assesses the situation.  
Once the order has been placed, you'll receive a message with yout order id. If your personal data is of invalid form, you'll get an alert message, and if you ordered some quantity of an item, but the stock of the item has changed while it was in your cart and that quantity exceeds the current stock, the quantity on your order will be automatically changed to the current stock of the product and you'll get an alert asking you to try to place the order again.  
The email inside the form is validated by consuming a free API which checks if it is a valid email (not necessarily a real one). This API has a monthly call limit of 100 calls, so if you are receiving an error validating your email, it is likely that the monthly limit has been exceeded. The call to the API can be overriden by modifying the 'checkEmail()' function inside the 'Cart.jsx' component file and replacing it with a direct call to the 'buy()' function.

## Stock and Order Management

On the footer of the page, there's a link to the Stock and Order Management component. Once you click on it, you'll be required to log in, the user is 'isvacustica@gmail.com' and the password 'admin12345'. Once authenticated, you'll be able to see the orders that are currently on the firestore database related to the app and you'll be able to remove them (the idea is that the manager of the store could remove them once the order has been delivered).  
You can also modify the stock of the items in the database with a counter similar to that on the item cards, according to what would be physically available if this was a real store. Only product stocks can be managed. Orders and stocks are updated in real time from the firestore database using the firestore onSnapshot method.


---

------------------------------------Create React App Documentation------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
