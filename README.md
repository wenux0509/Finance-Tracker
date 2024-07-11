# Finance-Tracker
To continue on this project few things you need to set up first
I did not upload the whole source code folder along with the framework code because it is unnecessary 

STEPS IMPLEMENTING THE GITHUB CODE IN YOUR IONIC PROJECT FOLDER <br>
Step 1<br>
Run visual studio code in ADMINISTRATION mode<br>
Step 2<br>
Use "IONIC start" in the terminal to start a project. Ensure your project directory is in htdocs<br>
Name your directory finance-tracker or something<br>
Step 3<br>
Configure the project with angular and please choose the blank page (menu) to start *Not important either because you need to replace the file later*<br>
Step 4<br>
Wait some time, once the project is successfully set up the terminal will tell you <br>
Step 5<br>
From your virtual studio code, open your directory folder, and remove the whole source folder called >src<br>
Step 6 <br>
Replace the one src folder in your project directory you just built with ionic start with the >src folder you downloaded from the git hub<br>
Step 7<br>
PHP file is put inside the finance-tracker, just simply put inside with other files. No need to open a new PHP folder inside the directory<br>
Step 8<br>
You may run the command ionic serve in the vsc terminal to see if it works, but ensure you configure the database using XAMPP as well. Structure at the very bottom of the readme document<br>

IMPORTANT ADDITIONAL INFORMATION BEFORE START
Notes:
1. MOST OF THE TIME, we only touch what is inside the folder >src, the rest of the files and folder we don't touch
2. INSIDE the >src folder, you will see many folders along with other files. We only need to touch the *>app* folder to develop our app, the rest don't touch unless specific configuration
3. IMPORTANT
-Under *>app* folder you will see three folders for now indicating three pages. Remember one folder for one page.
-VERY IMPORTANT: You will see other files like app.bla bla bla under the >app folder, The app file we touch the most is app-routing module.ts as it needs to be configured correctly every time once a new page is added. It decided the page flow of the app.
4. The same goes for other page folders such as login, register, and expenses tracker, there is a routing module for each of them imported into the app-routing.module as a whole to organize, usually we won't have to touch the routing module file under the page except the app.routing module because it is responsible to import the routing module from every page so the system knows what page needs to go when you run Ionic start.
5. To develop the new app page, we need to generate a new page using the command line *Ionic generate page PAGENAME * replace the page name with the actual name then it will automatically generate the folder under the app folder that comes with the module files, HTML file and so on.
6. Under the page folder, most of the time, we only need to touch the HTML file and the type script file (Not the specs.ts, don't touch it), the one ts file shown in blue acts like Java script. It defines our page behavior
7. For The SCSS file under the page folder, is basically css file for each page.
8. PHP file is SENSITIVE, ESPECIALLY Login.php, this is super important, do not easily change the structure of login PHP, anything you wont be able to logging inside the system
9. TS file is SENSITIVE ALSO, when data cannot retrieve most of the time it is because of ts file instead of php, do keep inspect the inspector provided by the browser see what is wrong with the code. For my case, the inspector mostly will say cannot request from php file, it either your php file is someting wrong or your connection to php file in ts file is something wrong with the name such as use get-transactions.php but actually is get-transaction.php (GPT will make this mistake,becareful ya)
10. For your information, the after succesfully login into the system, the system will store user_id of the login user into the local storage(fucntion in login type script), so that user know which user currently online and the user_id will be remove when log out(Function in expense tracker page type script).
11. Table retrieving the data from database by using the user_id, so it will select which transcation include the user_id and filter it and display in the main page, so other users wont be displayed.

PAGES INFORMATION >finance-tracker>src>app>
1.add-transaction (Button is clicked on the expense tracker page then this page will show up allow user to add transaction)
2.expense-tracker page (Main menu page and act as a medium to other function also responsible to perform CRUD operation which is display,edit (expected a edit button beside every transaction and when clicked a add expense similar page will show up and let user to modify) and delete (beside the edit button of every transaction records display in the main page also) )
3.Login page 
4.Register page (Currently only support username and password registration)

Notes *Becareful modify the types script and php file of the page, they are super sensitive especially when it comes to operation with database*

Other future requirement:
1. Adding one more page for APi such as using currency exchange
2. Using hardware access such as camera to save user profile picture (Might need a page displaying user information (Brief)), but the profile picture is saved in the database table called user_profile_picture (Because lecturer want our database capable to store image directly or via link, im thinking of implement this picture feature in the add transaction, but it threaten the survivability of the add transaction feature, so we start implement with something smaller)
3. Adding delete,edit and search feature such as search bar feature in the main page that search the transaction record by category, so it will interupt the table and display all the transaction records of that particular category
4. Choose one from external library such as Moment.js for date handling, Chart.js for charts (Transaction charts with months), etc..
5. Polish the interface with scss file that can be found in every page
6. User authentication (The most tricky part is forget password other than register than login, we develop this when system come to an end)
7. Lastly convert to the apk file 

*Rn only one table, because unsure what are the things to develop. We do this one by one*
The database name: "expensedb"
Table 1 name: "users"   *Keep record of registered user infomation, might change when implement the function of OTP*
Table structure SQL code:

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(100) NOT NULL,
 `password` varchar(255) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `email` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

Table 2 name: "transactions"
CREATE TABLE `transactions` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `amount` int(11) NOT NULL,
 `category` varchar(255) DEFAULT NULL,
 `date` datetime NOT NULL,
 `notes` varchar(255) DEFAULT NULL,
 `location` varchar(255) DEFAULT NULL,
 `user_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

Table 3 name: "user_pic" 
"Haven't implement yes, draft, because it a need for our database to handle picture directly or link, discover the link part first, directly is quite tricky"