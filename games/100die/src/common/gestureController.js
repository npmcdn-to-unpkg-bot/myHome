var vee = vee = vee || {};

vee.GestureController = cc.Class.extend({
	_target : null,
	_touchSource : null,
	_isTouchBegin : false,
	_beginPoint : null,
	_lastPoint : null,
	_timeBegin : null,
	_touchOffset : null,
	_eventListenser : null,

	unregister : function(){
		this._target = null;
		if (this._eventListenser) {
			cc.eventManager.removeListener(this._eventListenser);
			this._eventListenser = null;
		}
		this._isTouchBegin = false;
	},

	/**
	 *
	 * @param layer {cc.Layer}
	 * @param target {Object} target 需要回调方法才可以使用
     * @param swallowTouches {boolean} target 需要回调方法才可以使用
	 */
	register : function(layer, target, swallowTouches){
		this.unregister();
		this._target = target;
		layer.touchHandler = this;

        if (swallowTouches === undefined){
            swallowTouches = true;
        }
		var listener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: swallowTouches,
			onTouchBegan: this._handleTouchBegan,
			onTouchMoved: this._handleTouchMoved,
			onTouchEnded: this._handleTouchEnded,
			onTouchCancelled : this._handleTouchEnded
		});

		this._eventListenser = listener;
		cc.eventManager.addListener(listener, layer);
	},

	getBeginPoint : function() {
		var p = this._beginPoint;
		var o = this._touchOffset;
		return cc.p(p.x-o.x, p.y- o.y);
	},

	getBeginPointInWorld : function() {
		return this._beginPoint;
	},

	getLastPoint : function() {
		var p = this._lastPoint;
		var o = this._touchOffset;
		return cc.p(p.x-o.x, p.y- o.y);
	},

	getLastPointInWorld : function() {
		return this._lastPoint;
	},

	getDuration : function() {
		var time = new Date();
		return time - this._timeBegin;
	},

	_handleTouchBegan : function(touch, event) {
		var layer = event.getCurrentTarget();
		var g = layer.touchHandler;
		g._touchOffset = layer.convertToWorldSpace(cc.p(0,0));
		g._isTouchBegin = true;
		g._beginPoint = touch.getLocation();
		g._lastPoint = g._beginPoint;
		g._timeBegin = new Date();
		return g._onGestureBegin();
	},

	_handleTouchMoved : function(touch, event) {
		var g = event.getCurrentTarget().touchHandler;
		var p = touch.getLocation();
		g._onGestureMove(p);
		g._onGestureDrag(p);
		g._lastPoint = p;
		return true;
	},

	_handleTouchEnded : function(touch, event) {
		var g = event.getCurrentTarget().touchHandler;
		var p = touch.getLocation();
		g._onGestureMove(p);
		g._onGestureDrag(p);
		var distance = vee.Utils.distanceBetweenPoints(g._beginPoint, p);
		if (distance < 50) g._onGestureTap(distance);
		else if (distance >= 50 && (distance / g.getDuration() > 0.5)) {
			g._onGestureSwipe(p, distance);
		}
		g._onGestureLeave();
		g._isTouchBegin = false;
		return true;
	},

	_onGestureBegin : function(){
		if (this._target && this._target.onGestureBegin) {
			return this._target.onGestureBegin(this);
		}
		return true;
	},

	_onGestureTap : function(distance){
		if (this._target && this._target.onGestureTap) {
			this._target.onGestureTap(this, distance);
		}
	},

	_onGestureMove : function(p){
		if (this._target && this._target.onGestureMove) {
			var lp = this._lastPoint;
			this._target.onGestureMove(this, cc.p(p.x-lp.x, p.y-lp.y));
		}
	},

	_onGestureDrag : function(p){
		if (this._target && this._target.onGestureDrag) {
			var fp = this._beginPoint;
			this._target.onGestureDrag(this, cc.p(p.x-fp.x, p.y-fp.y));
		}
	},

	_onGestureSwipe : function(p, distance){
		if (this._target && this._target.onGestureSwipe) {
			var angle = vee.Utils.angleOfLine(this._beginPoint, p);
			this._target.onGestureSwipe(this, angle, distance);
		}
	},
	
	_onGestureLeave : function(){
		if (this._target && this._target.onGestureLeave) {
			this._target.onGestureLeave(this);
		}
	}
});

/**
 *
 * @param {Number} distance
 * * @param {vee.GestureController} context
 */
vee.GestureController.onGestureTap = function(context, distance) {};
/**
 *
 * @param {cc.Point} offset  与上一个 move 的offset
 * * @param {vee.GestureController} context
 */
vee.GestureController.onGestureMove = function(context, offset) {};
/**
 *
 * @param {cc.Point} offset 与起始点的 offset
 * * @param {vee.GestureController} context
 */
vee.GestureController.onGestureDrag = function(context, offset) {};
/**
 *
 * @param {Number} angle 划动的角度(360°)
 * @param {Number} distance 划动距离
 * @param {vee.GestureController} context
 */
vee.GestureController.onGestureSwipe = function(context, angle, distance) {};

vee.GestureController.onGestureBegin = function(context) {};
vee.GestureController.onGestureLeave = function(context) {};

/**
 * 注册接收 Gesture 事件
 * delegate 只需要实现下列方法即可在 Gesture 出现的时候被回调:
 * onGestureTap (distance)
 * onGestureMove (offset)
 * onGestureDrag (offset, distance)
 * onGestureSwipe (angle, distance)
 * @param {cc.Layer} touchSource
 * @param {Object} delegate 需要回调方法才可以使用
 * @param {boolean} swallow whether stop event pass to lower layer.
 * @return {vee.GestureController}
 */
vee.GestureController.registerController = function(touchSource, delegate, swallow) {
	var ctl = new vee.GestureController();
	ctl.register(touchSource, delegate, swallow);
	delegate.gestureController = ctl;
	return ctl;
};
