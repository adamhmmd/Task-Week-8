const pool = require("./config.js");
const express = require("express");
const { response } = require("express");
const router = express.Router();

//show all film

router.get("/film", (req, res) => {
  const filmQuery = `
  SELECT 
  * 
  FROM  film
  `

  pool.query(filmQuery, (err, response) => {
    if(err) throw err

   res.status(200).json(response);
  })
})

//show selected film id

router.get("/film/:id", (req, res) => {
  
  const id = req.params.id

  const selectFilmQuery = `
  SELECT 
  * 
  FROM film
    WHERE id = ${id}`

  pool.query(selectFilmQuery, (err, response) => {

    res.status(200).json(response)
  })
})

//show all category

router.get("/category", (req, res) => {
  const categoryQuery = `
  SELECT 
  * 
  FROM  category
  `

  pool.query(categoryQuery, (err, response) => {
    if(err) throw err

   res.status(200).json(response);
  })
})

//show film categories

router.get("/film", (req, res) => {
  const filmCategoryQuery = `
  SELECT 
    film.film_id AS film_id,
    film.title AS title,
    category.name AS name
  FROM  film
    INNER JOIN film_category
      ON film.film_id = film_category.film_id
    INNER JOIN category
      ON category.name = film_category.name
    `

  pool.query(filmCategoryQuery, (err, response) => {
    if(err) throw err

   res.status(200).json(response);
  })
})

module.exports = router;