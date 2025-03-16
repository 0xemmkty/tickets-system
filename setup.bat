@echo off

REM 创建主项目目录
mkdir ticket-system
cd ticket-system

REM 创建微服务目录
mkdir auth-service
mkdir ticket-service
mkdir order-service
mkdir payment-service
mkdir notification-service

REM 创建客户端应用
call npx create-react-app client --template typescript
cd client

REM 安装客户端依赖
call npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios

REM 创建必要的目录
mkdir src\components
mkdir src\pages

cd ..

REM 创建共享库目录
mkdir common

REM 初始化 auth-service
cd auth-service
mkdir src
cd src
mkdir routes
mkdir models
mkdir middlewares
mkdir config
cd ..

REM 创建 package.json
echo {^
  "name": "auth-service",^
  "version": "1.0.0",^
  "main": "index.js",^
  "scripts": {^
    "start": "node src/index.js",^
    "dev": "nodemon src/index.js"^
  },^
  "dependencies": {^
    "express": "^4.17.1",^
    "sequelize": "^6.31.0",^
    "pg": "^8.10.0",^
    "pg-hstore": "^2.3.4",^
    "jsonwebtoken": "^8.5.1",^
    "bcryptjs": "^2.4.3",^
    "cookie-parser": "^1.4.5"^
  },^
  "devDependencies": {^
    "nodemon": "^2.0.15"^
  }^
} > package.json

REM 创建配置文件
cd src\config
echo const config = {^
  database: {^
    host: process.env.DB_HOST ^|^| 'localhost',^
    port: process.env.DB_PORT ^|^| 5432,^
    username: process.env.DB_USER ^|^| 'postgres',^
    password: process.env.DB_PASSWORD ^|^| 'postgres',^
    database: process.env.DB_NAME ^|^| 'ticket_auth',^
    dialect: 'postgres'^
  },^
  jwtKey: process.env.JWT_KEY ^|^| 'dev_jwt_secret',^
  port: process.env.PORT ^|^| 3000^
};^
^
module.exports = config; > index.js
cd ..\..

REM 安装依赖
call npm install

cd ..

echo Setup completed successfully! 