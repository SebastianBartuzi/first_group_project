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