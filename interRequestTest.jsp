<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	欢迎进入全网接口测试页面 请输入登录名和密码
	<form action="front/sh/login!index?uid=l1" method="post">
		<table border="1">
			<tr>
				<td>姓名</td>
				<td><input type="text" name="name" id="name" value="111"></input></td>
			</tr>

			<tr>
				<td>密码</td>
				<td><input type="password" name="password" id="password" value="1111"></input></td>
			</tr>
			<tr>
				<td><input type="submit" value="提交"></input></td>
			</tr>
		</table>

	</form>
</body>
</html>