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
Replace the one src folder you downloaded from the git hub<br>
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

*Rn only one table, because unsure what are the things to develop. We do this one by one*
The database name: "expensedb"
Table 1 name: "users"
Table structure SQL code:

CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `email` varchar(100) NOT NULL,
 `password` varchar(255) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
