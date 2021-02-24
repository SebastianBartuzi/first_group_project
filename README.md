# Update - Weekly Poll Merge
The weekly poll has been merged and uses a new node module which we wasn't previously installed. To run the server after pulling the new changes:
### Step 1.
Open up a terminal and go to the folder called **frontend**.
### Step 2.
Once inside this folder use `npm install react-chartjs-2`.

# Running the Server
### Step 1.
Open up a terminal and go to the folder called **frontend**.
### Step 2.
Once inside this folder use `npm run build`, this will build the React app and should create a new folder called **build**.
### Step 3.
Go to the folder called **backend**, you can use `cd ../backend` to get there from the **frontend** folder.
### Step 4.
Once inside this folder use `npm start`, this will start the Express.js server.
### Step 5.
Use a web browser to go to **localhost:3000** and you should be able to see Project Happy!
### Important Note
You can keep the server running while making changes to the code. Any changes made to the code in the **backend** folder will cause the server to automatically restart and update with the new code. If you make any changes in the **frontend** folder you will need to use `npm run build` again before seeing any changes to the site.

You can choose to only run the front end server by using `npm start` in the folder **frontend**. This will remove the need to build the app everytime a change is made, however, there will be **no back end functionality**. This is useful if your editing the design of a page and aren't bothered about the actual functionality.