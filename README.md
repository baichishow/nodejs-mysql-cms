# nodejs-mysql-cms
基于nodejs + express + mysql2构建的CMS管理系统

## 安装api文档插件
```
npm i apidoc -g
```

## 进入项目
```
cd {项目目录}
```

## 安装依赖包，必须cnpm
```````
$ cnpm i
```

## 还原数据库
1. 安装数据库mysql8，navicate界面管理工具
2. 在mysql中创建cms数据库
3. 右键菜单，运行sql文件，将cms.sql文件还原至cms数据库 
4. 在config文件夹mysql.js文件，配置数据库、账户、密码；

## 重新生成API文档
```
$ npm run api
```

## 启动
```
$ npm start
```

## 后台API文档地址
```
http://localhost:3001/api/
```