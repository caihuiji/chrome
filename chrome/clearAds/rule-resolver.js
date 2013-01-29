/**
 * 
 * 广告规则解析器
 * 
 */

;var abstract_RuleResolver = function (){};

abstract_RuleResolver.prototype = {
		/**
		 * 解析规则
		 * 
		 * @param host -
		 *            当前域名
		 * 
		 * @return [] 需要删除的数组
		 */
		resolve : function (host){
			throw new error('resolve must be implement');
		},
		/**
		 * 获得广告的域名
		 * 
		 * @param host -
		 *            当前域名
		 * 
		 */
		isAdsDomain : function (str,host){
			if(!str){
				return false;
			}
			var index = str.indexOf('?');
			var domain = index == -1 ? str : str.substring(0,index);
			return domain.indexOf(host) == -1;
		}
};


var IframeRuleResolver = $.extend(new abstract_RuleResolver(),{
	resolve : function (host){
		var _self = this;
		var iframes = [];
		$('iframe').each(function (i,v) {
			_self.isAdsDomain(v.src,host) && iframes.push(v);
		});
		return iframes;
	}
});


var EmbebRuleResolver = $.extend(new abstract_RuleResolver(),{
	resolve : function (host){
		var _self = this;
		var embeds = [];
		$('embed').each(function (i,v) {
			_self.isAdsDomain(v.src,host) && embeds.push(v);
		});
		return embeds;
	}
});

/**
 * 解析 anchor
 */
var AnchorResolver = $.extend(new abstract_RuleResolver(),{
	resolve : function (host){
		var _self = this;
		var as = [];
		$('a').each(function (i,v) {
			_self.isAdsDomain(v.src,host) && as.push(v);
		});
		return as;
	}
});