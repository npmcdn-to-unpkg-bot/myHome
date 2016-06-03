/**
 * Created by brooklyn on 14-2-21.
 */
var vee = vee || {};
vee.Analytics = {
    pAnalytics: null,

    loadPlugins: function(){
        this.unloadPlugin();
        this.pAnalytics = plugin.PluginManager.getInstance().loadPlugin(app.Config.AnalyticsPluginName);
	    if (!this.pAnalytics) return;
        this.pAnalytics.setDebugMode(vee.Common.getInstance().isDebugMode());
        this.pAnalytics.startSession(app.Config.AnalysticsPluginConfig);
        this.pAnalytics.setCaptureUncaughtException(true);
    },

    unloadPlugin: function(){
        if (this.pAnalytics){
            plugin.PluginManager.getInstance().unloadPlugin(this.pAnalytics.getPluginName());
            this.pAnalytics = null;
        }
    },

    startSession: function(){
        if (this.pAnalytics){
            this.pAnalytics.startSession(app.Config.AnalysticsPluginConfig);
        }
    },

    stopSession: function(){
        if (this.pAnalytics){
            this.pAnalytics.stopSession();
        }
    },

    logTimedEventBegin: function(eventID){
        if (this.pAnalytics){
            this.pAnalytics.logTimedEventBegin(eventID);
        }
    },

    logTimedEventEnd: function(eventID){
        if (this.pAnalytics){
            this.pAnalytics.logTimedEventEnd(eventID);
        }
    },
	logEvent: function(eventID, paramMap){
        if (this.pAnalytics){
            if (arguments.length > 1){
                this.pAnalytics.logEvent(eventID, paramMap)
            } else {
                this.pAnalytics.logEvent(eventID);
            }
        }
	},

    /**
     * Log player level.
     * @param {number} level
     */
    logPlayerLevel: function(level){
        if (this.pAnalytics){
            this.pAnalytics.callFuncWithParam("logPlayerLevel",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeInt, level)
            );
        }
    },
    /**
     * Log purchase virtual product with virtual currency.
     * @param {string} productId
     * @param {number} number
     * @param {number} price
     */
    logItemPurchase: function(productId, price, number){
        if (this.pAnalytics){
            number = number || 1;
            this.pAnalytics.callFuncWithParam("logItemPurchase",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeStringMap, {
                    "itemID": productId,
                    "number": number.toString(),
                    "price" : price.toString()
                })
            );
        }
    },
    /**
     * Log when user use product.
     * @param {string} productId
     * @param {number} number
     */
    logItemUse: function(productId, number){
        if (this.pAnalytics){
            number = number || 1;
            this.pAnalytics.callFuncWithParam("logItemUse",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeStringMap, {
                    "itemID": productId,
                    "number": number.toString()
                })
            );
        }
    },

    /**
     * Log IAP.
     * @param {string} orderId
     * @param {string} iapID
     * @param {number} moneyAmount
     * @param {string} moneyType
     * @param {number} productAmount
     * @param {string} paymentType
     */
    logChargeRequest: function(orderId, iapID, moneyAmount, moneyType, productAmount, paymentType){
        if (this.pAnalytics) {
            moneyType = moneyType || "USD";
            productAmount = productAmount || 1;
            if (!paymentType) {
                if (cc.sys.os === cc.sys.OS_ANDROID) {
                    paymentType = "Google";
                } else if (cc.sys.os === cc.sys.OS_IOS) {
                    paymentType = "Apple";
                } else {
                    paymentType = "Unknown";
                }
            }
            this.pAnalytics.callFuncWithParam("logChargeRequest",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeStringMap, {
                    "orderID": orderId,
                    "iapID": iapID,
                    "currencyAmount": moneyAmount.toString(),
                    "currencyType": moneyType,
                    "productAmount": productAmount.toString(),
                    "paymentType": paymentType
                })
            );
        }
    },

    /**
     * Log IAP Success.
     * @param {string} orderId
     */
    logChargeSuccess: function(orderId){
        if (this.pAnalytics){
            this.pAnalytics.callFuncWithParam("logChargeSuccess",
                new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, orderId)
            );
        }
    },

	logMissionStart : function(missionId){
		if (this.pAnalytics){
			this.pAnalytics.callFuncWithParam("logMissionStart",
				new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, missionId)
			);
		}
	},

	logMissionCompleted : function(missionId){
		if (this.pAnalytics){
			this.pAnalytics.callFuncWithParam("logMissionCompleted",
				new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, missionId)
			);
		}
	},

	logMissionFailed : function(missionId, cause){
		if (this.pAnalytics){
			this.pAnalytics.callFuncWithParam("logMissionFailed",
				new plugin.PluginParam(plugin.PluginParam.ParamType.TypeStringMap, {
					"missionId": missionId,
					"cause": cause
				})
			);
		}
	},

	logAdTrackingCustEvent1 : function(){
		if (vee.tracking){
			vee.tracking.callFuncWithParam("logAdTrackingCustEvent1");
		}
	},

	logAdTrackingCustEvent2 : function(){
		if (vee.tracking){
			vee.tracking.callFuncWithParam("logAdTrackingCustEvent2");
		}
	},

	logAdTrackingCustEvent3 : function(){
		if (vee.tracking){
			vee.tracking.callFuncWithParam("logAdTrackingCustEvent3");
		}
	},

	logAdTrackingRegister : function(account){
		if (vee.tracking){
			vee.tracking.callFuncWithParam("logAdTrackingRegister",
				new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString, account)
			);
		}
	},

	logAdTrackingLogin : function(account){
		if (vee.tracking){
			vee.tracking.callFuncWithParam("logAdTrackingLogin",
				new plugin.PluginParam(plugin.PluginParam.ParamType.TypeString,  account)
			);
		}
	}
};

vee.Analytics.activate = function(){
	this.loadPlugins();
};
vee.Analytics.getAnalytics = function(pluginName, pluginConfig){
	var p = plugin.PluginManager.getInstance().loadPlugin(pluginName);
	if (!p) return null;
	p.setDebugMode(vee.Common.getInstance().isDebugMode());
	p.startSession(pluginConfig);
	p.setCaptureUncaughtException(true);
	return p;
};