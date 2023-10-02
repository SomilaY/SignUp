To run the API all you have to do is unzip the folder and in visual code you can just simply open the folder.

Open the terminal to and add "node app.js" to run the server port

In Postman Agent select "New" and select "HTTP"

Change the request method to post

Underneath the link theres gonna be sub headers and click Headers

Under key place "Content-Type"

Under value place "application/json"

This indicates that you are sending JSON data in the request body

Back to the sub headers select Body

Underneath Body select raw

then enter JSON payload with the user information

{
  "name": "John",
  "surname": "Cena",
  "username": "johncena123",
  "password": "wwechamp",
  "email": "johncena@wwe.com"
}

Click send and a user should register successfully

Continue from Sign Up To Sign In:

Change http://localhost:3000/register to http://localhost:3000/signin 

The user needs to provide username and password under Body with raw specified. To protect the password I utilized hashing and Salt
