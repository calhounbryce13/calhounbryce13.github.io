'use strict';
import express from 'express';
const app = express();
const PORT = 3000
import * as users from './page_model.mjs'


app.get('/contact', async (req, res) => {
    users.createUser()
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});