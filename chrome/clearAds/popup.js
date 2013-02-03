(function (win){
	
	
	function clearAds (){
	
		/**
		 * 脚本
		 */
		var innerScript = {
				_id : null,
				_host : null,
				/**
				 * 构造方法
				 */
				init: function (){
					this._host = document.location.host;
					return this;
				},
				/**
				 * 获得广告的域名
				 * 
				 */
				isAdsDomain : function (str){
					if(!str){
						return false;
					}
					var index = str.indexOf('?');
					var domain = index == -1 ? str : str.substring(0,index);
					return domain.indexOf(this._host) == -1;
				},
				getNodesNeedRemove : function (){
					var slice = Array.prototype.slice;
					var ads = [];
					
					

				var rule = [ "drmcmm.baidu.com", "cpro.baidu.com",
						"z.alimama.com", "static.googleadsserving.cn",
						"m.kejet.net","googleads.g.doubleclick.net","pagead2.googlesyndication.com" ];
					
					for(var index in rule ){
						// itself is ads,so push it into list which need to remove  and do not query content  
						if (document.location.host == rule[index] && ads.push(document.body) ){
							continue;
						}
						ads = ads.concat(slice.apply(document.querySelectorAll('body img[src*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body embed[src*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body object[data*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body a[href*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body iframe[src*="'+rule[index]+'"]')));
					};
					
					
					
					// 外部flash 
					var flash = document.querySelectorAll('body embed[src]');
					for(var i = 0; i<flash.length ;i++ ){
						this.isAdsDomain(flash[i].src) && (flash[i].src.indexOf(rule[0]) == -1) && ads.push(flash[i]);
						this.isAdsDomain(flash[i].src) && (flash[i].src.indexOf(rule[1]) == -1) && ads.push(flash[i]);
					}
					
					return ads;
				},
				remove :function (node){
					// the content had not finished but had detected it is ads ,after it completed then remove it 
					node && node.parentNode &&  node.parentNode.removeChild(node);
				},
				/**
				 * 清除
				 * 
				 * @param count , how many ads had removed
				 */
				clear:function (){
					var ads = this.getNodesNeedRemove();
					for(var i in ads){
						this.remove(ads[i]);
					}
					
					return ads;
				},
				/**
				 * start a runner to clear ads once each 3s 
				 */
				start: function (){
					var _seft = this;
					_seft._id = document.location.href;
					
					var timeOut = 3000;
					var times = 0;
					
					console.log("start ... ID :"+_seft._id );
					setTimeout (function (){
						var ads  =  _seft.clear();
						console.log(" removed:  " + ads.length + " in ID :"+_seft._id );
						times++ <= 5 ?  setTimeout(arguments.callee,timeOut) : console.log("stop ... ID :" +_seft._id);
					}, 100);
				}
		};
	
		innerScript.init().start();
	
	};
	
	clearAds();
	
})(window);

	