/**
 * 发布程序到远程主机
 */
var path = require('path');
var client = require('scp2');

var config = {
	//线上环境发布
	host: 'hplx.elicc.top',
	username: 'root',
	password: 'hplxqe123!@#',
	path: '/home/www/blog/public/'
}

//要发布的文件目录
var sourcePath = path.resolve(__dirname, './public/');

client.scp(sourcePath, config, function (err) {
	if (err) {
		console.error(err);
		throw err;
	} else {
		console.info(`All files upload completed.`);
	}
});
