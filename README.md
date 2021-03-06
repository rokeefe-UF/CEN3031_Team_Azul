# MoonFlow
​
Welcome to the Moonflow web app. 
This web app allows users to sign up for an astrology service wherein users will receive personalized interpretations based on their astrological ascendant and the current moon phase. 
​
## Information
​
This web app was created using the MERN stack. It features a home page which prompts a sign in or sign up for users. New users may choose to sign up by filling in the required information which will create a new user with authentication. New users will then receive their calculated sign and house information on the user page. Returning users may login to go to the same user page with their information. Admins may login with the specified admin login details which will redirect them to the admin page. This page will allow the admin to update interpretations based on sign, moon phase, and house and send these interpretations to users via email. 
​
### Getting Started
​
Setup the connection based on the environments below.
- local development: create a config file which exports your db.uri connection. 
- production: Set the "DB_URI" environment variable in heroku to the specified database uri.
​
# MoonFlow
​
Welcome to the Moonflow web app. 
This web app allows users to sign up for an astrology service wherein users will receive personalized interpretations based on their astrological ascendant and the current moon phase. 
​
## Information
​
This web app was created using the MERN stack. It features a home page which prompts a sign in or sign up for users. New users may choose to sign up by filling in the required information which will create a new user with authentication. New users will then receive their calculated sign and house information on the user page. Returning users may login to go to the same user page with their information. Admins may login with the specified admin login details which will redirect them to the admin page. This page will allow the admin to update interpretations based on sign, moon phase, and house and send these interpretations to users via email. 
​
### Getting Started
​
Setup the connection based on the environments below.
- local development: create a config file which exports your db.uri connection. 
- production: Set the "DB_URI" environment variable in heroku to the specified database uri.

### Features
​
Features include:
​

  •Horoscope Database:  Database of different horoscopes based on the combination of sun sign, lunar phase, and house that can be viewed and updated via an admin page. The database currently saves every combination of moon phase, house, and sign which will be accessed by the email sender and updated by the admin page
  
  •Axios: Fully functional CRUD capabilities that connect the front end of the website to the back end where the router and database exist. This allows creation and access to user information, horoscope data in order to push out information to your users.
​
  •UX/UI: A completely styled frontend with a consistent look across all pages for the user experience that provides an easy and clear user interaction
  
   - A consistent color palette and background implemented on each page the users and administrator visit
     
   - A moon and cloud mouse parallax displayed on the home page using the React Spring library
     
   - The login and sign up page forms are simple and easy to follow along with the ability to sign in or sign up with Google
   
  •Admin Page: Fully functional and dynamic page to handle the administrator’s interactions with saving their horoscope interpretations to the database
  
   - Viewing interpretations: Whenever a button is pressed to change the horoscope combination a GET request is sent asynchronously to the server using Axios. If the horoscope is valid, the interpretation state variable is updated to match the returned description. 
     
   - Editing interpretations: Whenever the submit button is pressed an update is called on the current horoscope combination. If the update fails, it is because that combination does not exist, so a new horoscope object is made and added to the database. Eventually, this will no longer create horoscope objects because all valid combinations have been made.
     
​
  •User Page: A dynamic web page for the individual user information to be displayed
   
   - Uses an Axios GET call to receive the user information in order to display their individual data to the page.
​
   •User Authentication: Allowing users access to only the account to which they are logged in by allowing users (and admin) to log in and sign up with their choice of google login or standard login.  
   
   - Sign up: Users are directed to sign up for the email list to get individual horoscopes, and access to a personalized user page
   
   -   A. Standard Sign In: Users input information about themselves and sign up with username and password which go to the database
		
   -   B. Google Sign In: Users have a username and password verified by Google’s API, and this web app uses its user profile information to help construct a user by getting user name, e-mail upon sign-up.
​
   - Log In: User login allows returning users to visit the user information page
   
   -   A. Standard Login: User inputs the username and password
		
   -  B. Google Login: The database finds a corresponding e-mail to the one authenticated by Google to verify users. 
		
- Upon login, the user credentials are fetched via Axios from the database to authenticate the user and get their personal information to display on their user page.  Upon successful authentication, a user session begins that allows a user to remain authenticated until they log out or close the page.  This user session is kept by retrieving user information upon login and keeping the user fields stored in local storage to retrieve at any time until the user logs out, at which point the local storage fields reset to their default values. 

- Page Authentication: Users cannot go to user/admin pages without login. By keeping user sessions and user information, a user without the correct login credentials is restricted from pages by being rerouted back to home.

•Email Sending: Fully functional email sending that sends users emails upon signing up and again whenever there is a moon phase change for which admin sends emails.  

- Upon sign up, users receive a welcome email sent using Nodemailer api, logging in admin to their email with Heroku config vars.  
Email messages are sent to all users who choose not to unsubscribe with every moon change.  To send these custom emails, admin logs in and creates messages for the combination of moon phases, signs, and houses, then sends emails to everyone for their personal horoscope by getting user information from the user database and horoscope information from the horoscope database.  


•User Calculation: User sign and house are calculated from the given user information from sign-up.  
- When a user signs up, they enter a place of birth, time of birth, and date of birth.  These allow for the web app to calculate the user’s ascendent sign by:

- Finding the location of birth for the user in latitude and longitude by using the Google Maps API to transform the city, state to latitude and longitude.  

- The Julian Calendar day of the user’s birth is calculated by passing in the time and date of the user’s birth to the swiss ephemeris API.   

- If no time of birth is given, the app defaults to just giving users their sun sign as opposed to their ascendent sign.  If no place of birth is given, the app defaults to the user being of the first house and having a sign of Aries.  

### API's Used
- Material-UI: Used for react styling and buttons

- React-Spring: Used for moon and cloud parallax displayed on the home page

- Google Sign-in: Used as an alternative way for users to sign up/in

- Axios HTTP Requests: Used to send information back and forth from the client to the server

- Firebase authentication: Secure passwords which can also be reset

- Swiss Ephemeris: Proper calculation of ascendant sign/houses

- Google Geocode API: Calculates the latitude and longitude of the user’s birthplace

- React Form Hooks: Used for user sign up/log in text fields

- Node Mailer : Used to send emails to all the subscribers.

### System Requirements
#### Config File
You need to make config file that that stores the MongoDB URI key for connecting the backend to the MongoDb atlas cluster that has been created for the specific purpose of storing both the personal information of users and the astrological interpretations for horoscopes. The atlas cluster should whitelist the Heroku where the app is hosted, found in the QuotaGuard Static Ip add-on in the Heroku dashboard.
File path in order to edit: server/config/config.js

## List of API's with step by step guide

•Axios Key: 2h589hg9unfd0sfyg72458ugn540983g

- Found in /server/controllers/personalInformationController.js (288,385,654,681) and client/src/axiosRequests.js (12,21,30,36)
- To change it, access your configuration variables in heroku and change the KEY variable to the new key you wish to use.

•Firebase Authentication Key: AIzaSyCTMiGtkLuPLBM15KcBZPpAtQeCThhv4GY

- Found in client/src/views/SignUp/config2.js 

- Used in: client/src/views/SignUp/Login.js, client/src/views/SignUp/SignUp.js, client/src/views/SignUp/ResetPassword.js, client/src/views/SignUp/User.js

- Accessing and changing this API key can be done in the firebase console inside of project MoonFlow, by clicking the settings tab on the left and choosing project settings and scrolling down to the API key as a configuration variable near the bottom of the screen.  

•Google Client ID: 566778365438-ogvkuv418kopqs9vt32qvou0nnb2lh6j.apps.googleusercontent.com
- Found in CEN3031_Team_Azul/client/src/views/SignUp/config.json

- Used In: client/src/views/SignUp/LoginWithGoogle.js, client/src/views/SignUp/SignUpWithGoogle.js, and client/src/views/SignUp/User.js.

- To access and change this key, one must login to the Google API Console using the Gmail created and from there choose the project with ID: moonflow-274723 and the key can be found in the credentials tab of the dashboard.  To add more URIs for which to be able to sign up / log in (if the web app is hosted from somewhere else), simply click on the OAuth 2.0 Client ID Key of Heavenly Writing and add your URI.  

•Nodemailer API:

- No key, but to send emails, one must have their email and password stored (not in plain text) and this is where heroku config variables of email and password are used (in the user and pass fields of the nodemailer transporter, respectively).  If email and password for gmail are changed, the email and passwords of heroku config vars must be changed as well.  

- Used in client/src/views/PersonalInformationController.js

## Environmental Variables

- DB URI: contains individual database URI

- USERNAME: heavenlymoonflow@gmail.com

- PASSWORD: m00nfl0w

- Google Cloud Platform Login (includes Firebase): same as Gmail credentials => can manage firebase database through the firebase dashboard (includes all users not using google login).  Firebase has its own config keys for using a web app with firebase (in project moonflow) and Google Cloud Platform has its own config keys for google sign up and login (in project MoonFlow).  

## Admin Login Credentials

- Username: heavenlymoonflow@gmail.com

- Password: m00nfl0w

