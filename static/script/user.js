var vee = vee = vee || {};

vee.User = {

	ID : null, //string
	phone : null, //string
	coin : 0, //number
	email : null, //string
	psw : null,//string

	logout : function() {
		this.ID = null;
		this.coin = 0;
		this.phone = null;
		this.psw = null;
		this.email = null;
		vee.firebase.database().ref("PhantomCat/users/" + vee.User.phone).off('value');
	},

	onUpdate : function() {
		// override this function to update UI
		console.log("user data on update-----");
		refreshUserInfoDiv();
	}
}


/*
 input : null, 使用之前需要先设置好 vee.User 的 phone 和 psw 信息
 output : String error 返回错误信息,没有错误则返回 false
 */
vee.User.FlowLogin = Flow.extend(function() {
	vee.firebase.database().ref("PhantomCat/users/" + vee.User.phone).on('value',
		function(ref) {
			/** @type {vee.User} */
			var data = ref.val();
			if (!data) {
				this.output("用户不存在.");
				return;
			}
			if (data.psw != vee.User.psw) {
				this.output("用户名与密码不匹配.");
				return;
			}

			vee.User.ID = data.ID;
			vee.User.coin = data.coin;
			vee.User.email = data.email;
			this.output(false);

			vee.User.onUpdate();
		}, this
	);
});

/*
 input : null, 使用之前需要先设置好 vee.User 的信息
 output : boolean
 */
vee.User.FlowUpdate = Flow.extend(function() {
	vee.firebase.database().ref("PhantomCat/users/" + vee.User.phone).set({
		phone : vee.User.phone,
		ID : vee.User.ID,
		coin : vee.User.coin,
		email : vee.User.email,
		psw : vee.User.psw
	}, function (error){
		this.output(!error);
	}.bind(this)
	);
}, "FlowUpdate");

