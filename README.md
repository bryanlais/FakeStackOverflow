<!-- FakeStackOverflow logo!-->
<br />
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" style="border-radius:10px" width="200" height="200">

  <h3 align="center">FakeStackOverflow</h3>
  
  <p align="center">
    The name of the application is self-explanatory.
  </p>

<!-- ABOUT THE PROJECT -->
## About The Project
This is the final project of CSE316 - which involves creating a mock application of the real Stack Overflow. 
### E/R Diagram Below
<img src="images/ER Diagram.png" style="border-radius:10px" width="1000" height="700">

### NOTE: 
Axios.post() calls usually work but for some unknown reason, it causes Axios.get() calls to not work. As a result, you may be seeing a lot of red error boxes saying "The Database has crashed" - despite the functionality for the most part working. It may be a huge annoyance to refresh and login every single time this occurs, so I do apologize for this. To compensate for this time spent, (which could be used for grading other projects), below are all the cases/functionality that I have programmed:
| Usecase      | Status |Description of the Usecase (Functionality) |
| ----------- | -------------- | ----------- |
| 1 | Completed | The user can create an account by entering a username, email, password (which is hashed using bcrypt) and its verification. An alert message is sent to the user if an e-mail already has a registered user, the e-mail is invalid, or the username/email is in the password.      |
| 2 | Completed | The user can login if registered and has typed in the correct credentials in the login page. An alert appears if the credentials are valid or not. If successful, it will log you into the application after clickin on OK, else, it won't.    |
| 3 | Completed | Logging out can be seen by clicking on the Sign Out button in the top right of the screen. This appears for both guest and registered users.|
| 4 | Completed | Upon logging in as a guest, questions are displayed with 5 questions at a time. This follows the same format as the previous homeworks. The next and prev are either gray/blue and will work respective to the color. These are outside the scrollable list of questions |
| 5 | Completed | Upon logging in as a registered user, you will be able to see a username in the banner (which leads to Usecase 14). It also displays questions and the ability to click on next/prev |
| 6 | Completed | Searching works for both accounts. |
| 7 | Completed | Tags are displayed as well, with 4 of them being in a row. Upon clicking them leads to a query that shows the questions with the corresponding tag. There may be some tags that have 0 questions - as this may occur due to the deletion of questions which is explained in Usecase 14. It might also occur if an axios.post call does not go through for some reason. The server.js is still functionial - but you are forced to refresh unfortunately. |
| 8 | Partially Completed (Some validations not accounted for) | Questions can be created with title, text, and tags. Some validations have not been checked as of writing this README.md|
| 9 | Not Completed | Answers currently do not have comments in the application nor do they have the prev/next functionality. In addition, answers do not have the votes. |
| 10 | Not Completed | The ability to add answers as a user is present (Use case 13). In addition, answers can also be viewed. However, there is no Next/Prev next functionality as of writing this document nor is there reputation along with its validations. |
| 11 | Partially Completed | Question Comments can be viewed as a guest. |
| 12 | Patially Completed | Comments can be submitted for questions on the answer page as a user. In addition, there are Next/Prev functionality for groups of 3. Upon submitting, there may be an axios.post error, but logging back into the application should have that comment appear in the answer page. | 13 | Completed | Creating a new answer is only applicable to a user and has been done in the past. |
| 14 | Completed | The profile page is only present for a user, has a sidebar with three buttons that can look at the respective user's questions, answers, and tags. In addition, there is an option to edit and delete each of them. |
## Built With
This project was built using React.JS, Node.JS, and MySQL. 

<!-- GETTING STARTED -->
## Getting Started

You need Node.js, React, MySQL and a functioning computer.

### Prerequisites

This server runs on Node and connects to a backend database. The server should run on localhost:8000.

For the backend, this application uses mySQL. 

For MySQL, the script should connect to an instance with the configuration:
	host     : 'localhost',
  user     : user,
 	password : pass,
  database : ‘fake_so’

User and Password for MySQL instances should be provided as arguments to the server script identical to the format described in HW4. 

### Installation
1. In all directories being /, /server and /client, run ```npm install``` 
2. In the /server directory, install the following 
```
npm install express 
npm install mysql
npm install nodemon
npm install bcrypt
npm install cors
```
3. In the /client directory, install the following
```
npm install axios 
npm install bootstrap react-bootstrap
npm install --save bootstrap@latest
```
## Usage

After installing the following libraries, you can run the application by doing the following:
1. In the /server directory, run ```nodemon setup.js -u root -p "password"```, which is the similar command seen in HW4. After doing this and the print statements stop with the creation of the schema/tables, you can exit out of this script using CTRL + C.
2. In the /server directory, run ```nodemon server.js -u root -p "password"```, to start localhost:8000 (the server!)
3. In the /client directory, run ```npm install```, to see the application on localhost:3000. It should pop up.
<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.
