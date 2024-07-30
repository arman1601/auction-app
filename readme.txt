Hello, I created a docker image for your convenience, below will be details on how to open the application.
But if you want without docker, then below will be the instructions.

1. Install Docker and Docker Compose: https://www.docker.com/
2. Create a folder and put the docker-compose.yml there.
3. Open the terminal in the folder where you dropped the dockerfile and write in the command line
docker-compose up --build
4. After the container is created, you can access the application by going to http://localhost:8080


1.Open cmd and clone the repository from GitHub git clone https://github.com/yourusername/your-repository.git
2.Go to the client folder and write 'npm install' .Do the same for the folder server
3.Make sure MySQL is installed and running on your computer. Open a terminal and write
3.1 mysql -u root -p
3.2 CREATE DATABASE audit_db;
    USE audit_db;
    SOURCE /path/to/your/database-file.sql;
4.Go to the server folder and run the command npm run serverDev
5.Go to the client folder and run the command npm run dev
6. Open the site via the link http://localhost:8080 and enjoy :)









