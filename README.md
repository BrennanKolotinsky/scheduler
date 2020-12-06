# Scheduler
Node.js app -- trying a few new things: keeping server and source code in the same directory using proxies, building an authentication system with JWT, caching information such as the user token, etc.


# Approach
1. Setup the server the way I wanted -- one directory using proxies -- link this with Heroku and GitHub
  - Make sure the server can take requests AND send static HTML
2. Build out a simple authenitcation system (using JWT)
3. Try to add some caching
4. After, I had tried learning new things, I setup the app as a react app and built familiar things:
  - Login page
  - MongoDB connection on MongoAtlas
  - Registration page
  - Component displaying some data and with updating capabilities
5. Once that was done I tried to iron out the biggest bugs

# Schema
I used MongoDB as my schema design. I find it is the fast to get up and running on a free server. A more structured SQL design might be better if there were very clear requirements for data structure and more time to plan

# Addditional Features
Immediate:
1. I'd want to sort out all the small bugs
  - For example, if you repeatedly change the account you are logged in with, caching can create some display issues
  - There were a few obvious small bugs like this that could be fixed quite easily
  - If you encounter any of these small bugs, just reload the page it should work fine then!
2. I would build out some features
  - Such as updating the time periods via manual entry (make them inputs)
  - Display the time in a more readable format in the persons local timezone
  - Ability to remove a time period from the system

Longterm
1. I would expand on the authentication system
  - Not all requests are verifying tokens at the moment
2. I would create the system with routes
  - Easier to get back to the login/home page
  - Easier to navigate
3. I would improve the UI, making it look more professional
4. I would consider other technologies for scalability
