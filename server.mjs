/*
** Author: Bryce Calhoun
** Description: 
*/

'use strict';
import express from 'express';
const app = express();
const PORT = 3000
import * as users from './page_model.mjs';
import expressAsyncHandler from 'express-async-handler';

app.use(express.static('public'));

app.use(express.urlencoded({'extended': true}));

//* route handler useing the "get" method to call an async function
app.get('/contactMe', async (req, res) => {
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const emailAddress = req.query.emailAddress;
    const usersMessage = req.query.usersMessage;

    //* try-catch block for communicating with the model page
    try{
        const respose = await users.createUser(firstName, lastName, emailAddress, usersMessage);
        res.send(`
                    <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=, initial-scale=1.0">
                <title>Bryce Calhoun</title>
                <link rel="stylesheet" href="main.css">
                <script src="contactScript.js"></script>

                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png?"> 
                <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png?"> 
                <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png?"> 
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png?"> 
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png?"> 
                <link rel="manifest" href="site.webmanifest">
            </head>
            <body>
                <button type="button" id="themeChange">Theme</button>
                <header id="myHeader">
                    <div id="headingContain">
                        <img src="header-image.png" id="header-image">
                        Bryce Calhoun

                    </div>     
                </header>
                <video autoplay muted loop id="background-video">
                    <source src="background_video - Made with Clipchamp.mp4" type="video/mp4">
                </video>
                
                <nav id="localNavigation">
                    <a href="index.html" class="fancy-link">Home</a>
                </nav>
                <main style="border: 4px solid black;">
                    <h1>Thank you for reaching out to me ${firstName}, 
                        your message has been received!</h1>
                </main>
                <footer>
                    <p id="copyright">
                        &copy; 2023 Bryce Calhoun
                    </p>
                    <p>
                        <a href="https://www.linkedin.com/in/bryce-calhoun-4126b6219" class="fancy-link">LinkedIn</a>
                        <a href="https://www.github.com/calhounbryce13" class="fancy-link">Github</a>
                    </p>
        
                </footer>
            </body>
            </html>
    `);
    }catch(error){res.send(`
                    <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=, initial-scale=1.0">
                <title>Bryce Calhoun</title>
                <link rel="stylesheet" href="main.css">
                <script src="contactScript.js"></script>

                <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png?"> 
                <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png?"> 
                <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png?"> 
                <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png?"> 
                <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png?"> 
                <link rel="manifest" href="site.webmanifest">
                </head>
                <body>
                <button type="button" id="themeChange">Theme</button>
                <header id="myHeader">
                    <div id="headingContain">
                        <img src="header-image.png" id="header-image">
                        Bryce Calhoun

                    </div>     
                </header>
                <video autoplay muted loop id="background-video">
                    <source src="background_video - Made with Clipchamp.mp4" type="video/mp4">
                </video>

                <nav id="localNavigation">
                    <a href="index.html" class="fancy-link">Home</a>
                </nav>
                <main style="border: 4px solid black;">
                    <h1>An unexpected issue occured, I apologize but your message was not saved. Please try again.</h1>
                </main>
                <footer>
                    <p id="copyright">
                        &copy; 2023 Bryce Calhoun
                    </p>
                    <p>
                        <a href="https://www.linkedin.com/in/bryce-calhoun-4126b6219" class="fancy-link">LinkedIn</a>
                        <a href="https://www.github.com/calhounbryce13" class="fancy-link">Github</a>
                    </p>
        
                </footer>
            </body>
            </html>
                `);};
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});