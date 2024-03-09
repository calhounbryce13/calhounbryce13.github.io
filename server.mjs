'use strict';
import express from 'express';
const app = express();
const PORT = 3000
import * as users from './page_model.mjs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

//app.use(express.static('public'));

const __filename = fileURLToPath(import.meta.url);
const directory = dirname(__filename);

app.use(express.static(directory));


app.get('/contact', async (req, res) => {
    users.createUser()
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});