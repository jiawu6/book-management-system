1 功能分析

管理员层面：搭建一个简单的具有注册学生、编辑学生账号信息、录入或者删除已存在的图书信息、修改图书信息以及添加借出归还记录功能的管理员管理系统；

学生层面：搭建一个简单的具有登录、修改个人信息、查询图书以及借书还书功能的开放借阅系统；

2 设计目标

学生层面：

未登录：主页左侧导航显示home、login、feedback，右侧显示欢迎字样——系统名；

登录后：主页左侧导航显示search、me、logout，右侧显示图书查询输入框；

学生登录后返回到search页面；登出后返回到home页面；

管理员层面：

未登录：显示登录页；

登录后：显示主页——主页左侧导航显示regist-student、edit-info、do-books；

管理员登录后返回到regist-student页面；登出后返回到登录页；

3 路由规划

管理员层面：

/admin：登录页-管理员登录
/admin/logout：登出页-返回到管理员登录
/admin/regist-student：注册页-给新生注册账号
/admin/edit-info：修改页-修改学生账号信息
/do-books：操作页-录入或者删除已存在的图书信息、修改图书信息以及添加借出归还记录
	/admin-delete-books：具体删除图书中间页
	/admin-edit-books：具体修改传递参数中间页


学生层面：

/：首页-欢迎学生
/login：登录页-学生登录
/search：查询页-学生查询图书信息
/setting：个人页-学生修改个人信息
/logout：登出页-学生登出，返回/
/details：图书详情页-反映图书当前书名、作者、出版日期，简介
/chatroom：图书交流即时聊天-只有通过/details才能进入
/specific:特定图书详情页-位置以及借阅状态
	/transparent：起中间传递参数作用


4 文件夹说明

views:放置的是被用于渲染的ejs文件（即原HTML页面文件）

routes：放置的是处理客户端请求不同路由的处理的JavaScript文件

public：放置的是静态资源（支撑原HTML文件的CSS/JS/IMG文件）


5 文档研读说明

1-
根据：The production of working systems use frameworks such as HTML, CSS, JavaScript/JQuery and Node.js.
结论：允许采用框架；

2-
根据：The server should use a database to store information and pass it to the client through an API.
结论：采用mongodb；

3-
根据：WebSockets should be used to enable communication between two clients.
结论：采用socket.io--聊天室；

4-
根据：This is a brief summary of your planned application. It should explain what the application will do and which technologies you plan to use.
结论：说明应用程序将执行的操作以及您计划使用的技术；

5-
根据：There is a 150MB limit on the final submission. 
结论：文件大小<=150MB；


6 部署说明

sinstallation.bat：npm下载package.json中的包；
suninstallation.bat：npm删除特定的包，需手动修改；
smochatest.bat：开始test文件夹下的mocha测试；
startserver.bat：启动服务器；
startmongodb.bat：启动数据库；

auto_dodb_tools_js文件夹中放置了快速操作数据库形成测试数据的脚本；

数据库mongodb说明：

	cookieSecret: "soft355" // 用于用户会话时cookie加密的
	db: "booksmanager" // 数据库名称，请在本地安装数据库的根目录下新建文件夹‘booksmanager’
	host: "localhost" // 主机名
	port: 27017 // 监听端口（默认）