const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
    user: 'u3m7grklvtlo6',
    host: '35.209.89.182',
    database: 'dbzvtfeophlfnr',
    password: 'AekAds@24',
    port: 5432, // PostgreSQL default port


});

// Route to display all properties and handle editing and insertion
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM public.properties');
        res.render('properties', { properties: result.rows });
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).send('Error fetching data');
    }
});

// Route to handle inserting new properties
app.post('/properties/add', async (req, res) => {
    const { zone, locality, property_name, pin_code, property_price_upto, screen_size, no_of_towers, no_of_screens, captive_households, approx_reach, type, extra_1, extra_2, extra_3, extra_4, extra_5 } = req.body;

    try {
        await pool.query(
            `INSERT INTO public.properties (zone, locality, property_name, pin_code, property_price_upto, screen_size, no_of_towers, no_of_screens, captive_households, approx_reach, type, extra_1, extra_2, extra_3, extra_4, extra_5) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
            [zone, locality, property_name, pin_code, property_price_upto, screen_size, no_of_towers, no_of_screens, captive_households, approx_reach, type, extra_1, extra_2, extra_3, extra_4, extra_5]
        );
        res.redirect('/properties'); // Refresh the page after insertion
    } catch (error) {
        console.error('Error inserting data', error);
        res.status(500).send('Error inserting data');
    }
});

// Route to handle editing of properties
app.post('/properties/update', async (req, res) => {
    const { property_id, zone, locality, property_name, pin_code, property_price_upto, screen_size, no_of_towers, no_of_screens, captive_households, approx_reach, type, extra_1, extra_2, extra_3, extra_4, extra_5 } = req.body;

    try {
        await pool.query(
            `UPDATE public.properties SET zone = $1, locality = $2, property_name = $3, pin_code = $4, property_price_upto = $5, screen_size = $6, no_of_towers = $7, no_of_screens = $8, captive_households = $9, approx_reach = $10, type = $11, extra_1 = $12, extra_2 = $13, extra_3 = $14, extra_4 = $15, extra_5 = $16 WHERE property_id = $17`,
            [zone, locality, property_name, pin_code, property_price_upto, screen_size, no_of_towers, no_of_screens, captive_households, approx_reach, type, extra_1, extra_2, extra_3, extra_4, extra_5, property_id]
        );
        res.redirect('/properties');
    } catch (error) {
        console.error('Error updating data', error);
        res.status(500).send('Error updating data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
