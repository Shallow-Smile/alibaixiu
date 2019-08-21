// module.exports = async (req, res) => {
// 	if (req.session && req.session.userInfo) {
// 		res.send('var isLogin = true')
// 	}else {
// 		res.send('var isLogin = false')
// 	}
// };
module.exports = async (req, res) => {
	console.log(req);
	
	if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
		// const s = 
		res.send(`var userId=\"${req.session.userInfo._id}\" ;var isLogin = true; `)
	}else {
		res.send('var isLogin = false')
	}
};
