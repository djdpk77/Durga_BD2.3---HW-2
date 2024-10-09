const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// Array of products

let products = [
  { name: 'Product A', inStock: true },
  { name: 'Product B', inStock: false },
  { name: 'Product C', inStock: true },
  { name: 'Product D', inStock: false },
];

// Array of users
let users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 17 },
  { name: 'Dave', age: 16 },
];

// Array of products with prices
let productPrices = [
  { name: 'Product A', price: 50 },
  { name: 'Product B', price: 150 },
  { name: 'Product C', price: 200 },
  { name: 'Product D', price: 90 },
];

// Array of articles with word counts
let articles = [
  { title: 'Article A', wordCount: 400 },
  { title: 'Article B', wordCount: 600 },
  { title: 'Article C', wordCount: 700 },
  { title: 'Article D', wordCount: 300 },
];

// Array of movies with ratings
let movies = [
  { title: 'Movie A', rating: 8.5 },
  { title: 'Movie B', rating: 7.0 },
  { title: 'Movie C', rating: 9.0 },
  { title: 'Movie D', rating: 6.5 },
];

// Array of employees with experience in years
let employees = [
  { name: 'Employee A', experience: 3 },
  { name: 'Employee B', experience: 6 },
  { name: 'Employee C', experience: 10 },
  { name: 'Employee D', experience: 2 },
];

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Function to filter in-stock products
function filterInStockProducts(product) {
  return product.inStock;
}

//Endpoint 1: Filter In-Stock Products
app.get('/in-stock-products', (req, res) => {
  let result = products.filter((product) => filterInStockProducts(product));
  res.json(result);
});

// Function to filter adult users
function filterAdults(user) {
  return user.age >= 18;
}

//Endpoint 2: Filter Adults from User List
app.get('/adult-users', (reg, res) => {
  let result = users.filter((user) => filterAdults(user));
  res.json(result);
});

// Function to filter expensive products
function filterExpensiveProducts(product, price) {
  return product.price > price;
}

//Endpoint 3: Filter Expensive Products
app.get('/expensive-products', (req, res) => {
  let price = parseFloat(req.query.price);
  let result = productPrices.filter((product) =>
    filterExpensiveProducts(product, price)
  );
  res.json(result);
});

// Function to filter long articles
function filterLongArticles(article, minWords) {
  return article.wordCount > minWords;
}

//Endpoint 4: Filter Articles by Word Count
app.get('/long-articles', (req, res) => {
  let minWords = parseFloat(req.query.minWords);
  let result = articles.filter((article) =>
    filterLongArticles(article, minWords)
  );
  res.json(result);
});

// Function to filter high rated movies
function filterHighRatedMovies(movie, rating) {
  return movie.rating > rating;
}

//Endpoint 5: Filter Movies by Rating
app.get('/high-rated-movies', (req, res) => {
  let rating = parseFloat(req.query.rating);
  let result = movies.filter((movie) => filterHighRatedMovies(movie, rating));
  res.json(result);
});

// Function to filter experienced employees |
function filterExperiencedEmployees(employee, years) {
  return employee.experience > years;
}

//Endpoint 6: Filter Employees by Experience
app.get('/experienced-employees', (req, res) => {
  let years = parseFloat(req.query.years);
  let result = employees.filter((employee) =>
    filterExperiencedEmployees(employee, years)
  );
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
