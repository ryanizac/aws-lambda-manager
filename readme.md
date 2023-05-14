# AWS Lambda Manager

An application for managing AWS Lambda Functions with Node JS using **Lambda Client SDK**

## ⚠️ Warnings

- **Access API**: The initial responsibility of this project is to manage AWS Lambdas remotely. But for them to work, another AWS Service is needed: API Gateway. It's what allows you to access a lambda through a link.

- **Database**: in this project there is a lambda to create a "to do". For this service to work, it depends on a remote database, and its information must be provided through environment variables.

- **Database**: the `todo_db` database and the `todo` table must have been created. An upcoming feature is managing a database locally.

- **Environment Variables**: there is a feature implemented that extracts the chosen local environment variable and sends them to the Lambda Function. It is not good practice because the values are not encrypted. AWS has a service to manage keys and it may be implemented in a future feature.

## 🔔 Features

- Loads the paths of a specific directory (src/lambdas)
- Builds each .ts file and sends it to a lambda function in AWS
- **SOLID** to create layers for the application core
- Create a to do

## ✨ How it works

1. Load .ts files from directory
2. Create bundle for each .ts file
3. Create a zip file for each file named "index.js"
4. Create an AWS Lambda for each zip file

## ⚙ How to configure

After the clone, you need install all the dependencies with the following command:

`npm install`

You need create an **.env** file and set the following credentials:

**Database**

- host
- port
- user
- password

**AWS Account**

- accessKey
- secretAccessKey
- role
