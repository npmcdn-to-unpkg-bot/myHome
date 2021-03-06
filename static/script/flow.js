/**
 * Created with JetBrains WebStorm.
 * User: Yop Chan
 * Date: 14-11-15
 * Time: 下午3:42
 * To change this template use File | Settings | File Templates.
 */

var cc = cc = cc || {};

var _ = {
	isFunction : function(obj) {
		if (Object.prototype.toString.call(this.noop) !== '[object Function]') {
			this.isFunction = function(obj) {
				return typeof obj == 'function' || false;
			};
		} else {
			this.isFunction = function(obj) {
				return Object.prototype.toString.call(obj) === '[object Function]';
			}
		}
		return this.isFunction(obj);
	},

	isString : function(obj) {
		return Object.prototype.toString.call(obj) === '[object String]';
	},

	isNumber : function(obj) {
		return Object.prototype.toString.call(obj) === '[object Number]';
	}
}


var ClassManager = {
	id : (0|(Math.random()*998)),

	instanceId : (0|(Math.random()*998)),

	compileSuper : function(func, name, id){
		//make the func to a string
		var str = func.toString();
		//find parameters
		var pstart = str.indexOf('('), pend = str.indexOf(')');
		var params = str.substring(pstart+1, pend);
		params = params.trim();

		//find function body
		var bstart = str.indexOf('{'), bend = str.lastIndexOf('}');
		var str = str.substring(bstart+1, bend);

		//now we have the content of the function, replace this._super
		//find this._super
		while(str.indexOf('this._super')!= -1)
		{
			var sp = str.indexOf('this._super');
			//find the first '(' from this._super)
			var bp = str.indexOf('(', sp);

			//find if we are passing params to super
			var bbp = str.indexOf(')', bp);
			var superParams = str.substring(bp+1, bbp);
			superParams = superParams.trim();
			var coma = superParams? ',':'';

			//replace this._super
			str = str.substring(0, sp)+  'ClassManager['+id+'].'+name+'.call(this'+coma+str.substring(bp+1);
		}
		return Function(params, str);
	},

	getNewID : function(){
		return this.id++;
	},

	getNewInstanceId : function(){
		return this.instanceId++;
	}
};
ClassManager.compileSuper.ClassManager = ClassManager;

(function () {
	var fnTest = /\b_super\b/;
	var releaseMode = true;
	/**
	 * The base Class implementation (does nothing)
	 * @class
	 */
	cc.Class = function () {
	};

	cc.log = function(obj) {
		console.log(obj);
	}

	/**
	 * Create a new Class that inherits from this Class
	 * @static
	 * @param {object} props
	 * @return {function}
	 */
	cc.Class.extend = function (props) {
		var _super = this.prototype;

		// Instantiate a base Class (but only create the instance,
		// don't run the init constructor)
		var prototype = Object.create(_super);

		var classId = ClassManager.getNewID();
		ClassManager[classId] = _super;
		// Copy the properties over onto the new prototype. We make function
		// properties non-eumerable as this makes typeof === 'function' check
		// unneccessary in the for...in loop used 1) for generating Class()
		// 2) for cc.clone and perhaps more. It is also required to make
		// these function properties cacheable in Carakan.
		var desc = { writable: true, enumerable: false, configurable: true };

		prototype.__instanceId = null;

		// The dummy Class constructor
		function Class() {
			this.__instanceId = ClassManager.getNewInstanceId();
			// All construction is actually done in the init method
			if (this.ctor)
				this.ctor.apply(this, arguments);
		}

		Class.id = classId;
		// desc = { writable: true, enumerable: false, configurable: true,
		//          value: XXX }; Again, we make this non-enumerable.
		desc.value = classId;
		Object.defineProperty(prototype, '__pid', desc);

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		desc.value = Class;
		Object.defineProperty(Class.prototype, 'constructor', desc);

		// Copy getter/setter
		this.__getters__ && (Class.__getters__ = cc.clone(this.__getters__));
		this.__setters__ && (Class.__setters__ = cc.clone(this.__setters__));

		for(var idx = 0, li = arguments.length; idx < li; ++idx) {
			var prop = arguments[idx];
			for (var name in prop) {
				var isFunc = (typeof prop[name] === "function");
				var override = (typeof _super[name] === "function");
				var hasSuperCall = fnTest.test(prop[name]);

				if (releaseMode && isFunc && override && hasSuperCall) {
					desc.value = ClassManager.compileSuper(prop[name], name, classId);
					Object.defineProperty(prototype, name, desc);
				} else if (isFunc && override && hasSuperCall) {
					desc.value = (function (name, fn) {
						return function () {
							var tmp = this._super;

							// Add a new ._super() method that is the same method
							// but on the super-Class
							this._super = _super[name];

							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = fn.apply(this, arguments);
							this._super = tmp;

							return ret;
						};
					})(name, prop[name]);
					Object.defineProperty(prototype, name, desc);
				} else if (isFunc) {
					desc.value = prop[name];
					Object.defineProperty(prototype, name, desc);
				} else {
					prototype[name] = prop[name];
				}

				if (isFunc) {
					// Override registered getter/setter
					var getter, setter, propertyName;
					if (this.__getters__ && this.__getters__[name]) {
						propertyName = this.__getters__[name];
						for (var i in this.__setters__) {
							if (this.__setters__[i] == propertyName) {
								setter = i;
								break;
							}
						}
						cc.defineGetterSetter(prototype, propertyName, prop[name], prop[setter] ? prop[setter] : prototype[setter], name, setter);
					}
					if (this.__setters__ && this.__setters__[name]) {
						propertyName = this.__setters__[name];
						for (var i in this.__getters__) {
							if (this.__getters__[i] == propertyName) {
								getter = i;
								break;
							}
						}
						cc.defineGetterSetter(prototype, propertyName, prop[getter] ? prop[getter] : prototype[getter], prop[name], getter, name);
					}
				}
			}
		}

		// And make this Class extendable
		Class.extend = cc.Class.extend;

		//add implementation method
		Class.implement = function (prop) {
			for (var name in prop) {
				prototype[name] = prop[name];
			}
		};
		return Class;
	};
})();

/**
 * Created with JetBrains WebStorm.
 * User: Yop Chan
 * Date: 13-1-28
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */
var Flow = Flow = Flow ||{};

Flow.FlowStatus = {
	WaitingForInput : 1,
	WaitingForAction : 2,
	Finished : 3
};

Flow.isDebug = false;

Flow.debug = function() {
	Flow.isDebug = true;
};

Flow.BasicModel = cc.Class.extend({
	_name : "BasicModel",
	_status : Flow.FlowStatus.WaitingForInput,
	data : null,
	_onResult : null,
	_head : null,

	ctor : function(data){
		this.data = data;
		//Should not call begin here as the ctor require a immediate return and the begin might delay the return.
	},

	log : function(label, msg){
		if (!Flow.isDebug) return;
		cc.log('Flow [' + this._name + '|'+ this._status + '] '+ label + ': \t' + msg);
	},

	reset : function(){
		this._status = Flow.FlowStatus.WaitingForInput;
	},

	_input : function(data){
		if(this._status != Flow.FlowStatus.WaitingForInput) {
			this.log('error', 'Flow is not waitingForInput');
			return;
		}
		this._status = Flow.FlowStatus.WaitingForAction;
		this.action(this.onInput(data));
	},

	action : function(data){
		this.log("Action", data);
		if(this._status != Flow.FlowStatus.WaitingForAction) { return; }
		this.onAction(data);
	},

	output : function(data, fork) {
		if (this._onResult) this._onResult(data);
	},

	done : function(fork) {
		this.output(true, fork);
	},

	/**
	 * Override this function to validate or format input data.
	 * @param {*} original input data
	 * @param {*} input data after processed
	 */
	onInput : function(data){ return data; },

	/**
	 * Override this function to Handle the (after processed) input data. Call this.output(data) to Finish this Flow.
	 * @param {*} input data after processed
	 * @returns {*} output data
	 */
	onAction : function(data){ this.output(data); },

	onResult : function(callback) {
		this._onResult = callback;
		return this;
	},

	go : function(data) {
		var head = (this._head ? this._head : this);
		head._input(data);
	},

	then : function(flowClass, data) {
		var f = Flow.do(flowClass, data);
		if (!f) {
			this.log('error', 'Object is not a instance of Flow.');
			return;
		}
		f._head = (this._head ? this._head : this);
		this.onResult(function(data){
			f._input(data);
		});
		return f;
	},

	/**
	 * will run flow depending the fork argument of function output(data, fork).
	 * @param {Object} forkObject , a object which key is the fork string and value is the flow will run.
	 * @returns {Flow.BasicModel}
	 */
	fork : function(forkObject) {
		this.log('error', 'To support fork you must extend a Flow.ForkModel or use Flow.extendFork function.')
		return;
	},

	 thenAll : function(flowArray) {
		return this.then(Flow.doAll(flowArray));
	}
});

/**
 * get a Flow object
 * @param {Flow.BasicModel|Array} a flow can be represented by a FlowClass, a Flow object, or an Array [FlowClass, data]
 * @param {*} data
 * @returns {*}
 */
Flow.do = function(flow, data){
	if (flow instanceof Array && flow.length == 2) {
		data = flow[1];
		flow = flow[0];
	}
	var f = (flow instanceof Flow.BasicModel ? flow : new flow(data));
	if (! f instanceof Flow.BasicModel) {
		return null;
	}
	return f;
};

Flow.doAll = function(flowArray) {
	return new Flow.SyncModel(flowArray);
};

/**
 * @param obj
 * @param name
 * @returns {Flow.BasicModel}
 */
Flow.extend = function(obj, name){
	if (_.isFunction(obj)) {
		var action = obj;
		obj = {};
		obj._name = (name ? name : "Name Unknown");
		obj.onAction = action;
	}
	return Flow.BasicModel.extend(obj);
};

Flow.ForkModel = Flow.extend({
	_name : "ForkModel",
	forkObject : null,

	output : function(data, fork) {
		var fork = (this.forkObject && (_.isString(fork) || _.isNumber(fork)) ? this.forkObject[fork] : fork);
		fork = (fork && this.forkObject ? Flow.do(fork) : fork);
		if (this.forkObject && !fork) {
			this.log('error', 'Missing fork. You must pass your fork argument like this.output(data, fork); or this.done(fork) ');
			vee.Utils.logKey(this.forkObject, "Here are your forks:");
			return;
		}
		this._status = Flow.FlowStatus.Finished;
		if (this.forkObject) {
			fork.onResult(this._onResult);
			fork.go(data);
		} else if (this._onResult) this._onResult(data);
	},

	fork : function(forkObj) {
		this.forkObject = forkObj;
		return this;
	}
});

/**
 * @param obj
 * @param name
 * @returns {Flow.BasicModel}
 */
Flow.extendFork = function(obj, name){
	if (_.isFunction(obj)) {
		var action = obj;
		obj = {};
		obj._name = (name ? name : "Name Unknown");
		obj.onAction = action;
	}
	return Flow.ForkModel.extend(obj);
};

Flow.ValidateModel = Flow.extend({
	_name : "ValidateModel",
	//The input data sample which will be use in input validation
	_inputLock : null,

	validate : function(data) {
		for(var k in this._inputLock){
			if(!data.hasOwnProperty(k)) return false;
		}
		return this._validate(data);
	},

	onValidate : function(data) { return true },

	input : function(data){
		if(!this.validate(data)){
			this.log('Warning', 'Input validate fail');
			this.reset();
			return;
		}
		this._super(data);
	}
});

Flow.SyncModel = Flow.extend({
	_name : "SyncModel",
	count : 0,

	subMissionDone : function(){
		this.count++;
		if (this.count == this.data.length) this.done();
	},

	onAction : function(data){
		if (!this.data instanceof Array) {
			this.log('error', 'Wrap Data is not an Array of flows');
			return;
		}
		var len = this.data.length;
		for (var i = 0; i < len; i++) {
			var flow = Flow.do(this.data[i]);
			flow.onResult(function(){
				this.subMissionDone();
			}.bind(this));
			flow.go(data);
		}
	}
});

Flow.NONE = Flow.BasicModel;