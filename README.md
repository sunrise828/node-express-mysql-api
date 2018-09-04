# Rest Api Node and Mysql

## Description
This is an Restful API for Node.js and Mysql. Designed after PHP's beautiful Laravel. This is in the MVC format,
specially view is on pug, just models and controllers.

##### Routing         : Express
##### ORM Database    : Sequelize
##### Authentication  : Passport, JWT

## Installation

#### Download Code | Clone the Repo

```
git clone {repo_name}
```

#### Install Node Modules
```
npm install
```

#### Create .env File
You will find a example.env file in the home directory. Paste the contents of that into a file named .env in the same directory. 
Fill in the variables to fit your application
Also you have to input your social screct key for social login on /config folder.


### Configuration of Database
All tables are created when you run project firstly.
But you have to import of following User Group Table.
```
sso_user_grp.sql
```

