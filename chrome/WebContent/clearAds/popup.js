window.chj_clear  = function (setting){
	var override = {
			ruleResolvers : []
	}
	
	var _self = this;
	var $removing = [];
	
	/**
	 * 域名
	 */
	var host = undefined;
	
	/**
	 * 私有方法
	 */
	var _method = {
			/**
			 * 构造方法
			 */
			init: function (){
				host = location.hostname.split(".");
				host = host.length > 1 ? host[host.length-2] : '';
			},
			/**
			 * 清除
			 */
			clear:function (){
				this.remove(this.getAds());
				$.each(ruleResolvers , function (i,v){
					_method.remove(v.resolve(host));
				});
			},
			/**
			 * 删除
			 */
			remove : function ($removes){
				$($removes).each(function (i,v){
					console.log("remove",$(v));
					$(v).remove();
				});
			},
	};
	
	/**
	 * 启动
	 */
	this.enable = function (){
		_method.clear();
	};
	
	/**
	 * 关闭
	 */
	this.diable = function (){
		_method.close();
	};
	
	_method.init();
	
	return this; 
	
};
