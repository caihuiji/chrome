(function (win){
	
	
	function clearAds (){
	
		/**
		 * 脚本
		 */
		var innerScript = {
				_host : null,
				/**
				 * 构造方法
				 */
				init: function (){
					var host = location.hostname.split(".");
					this._host = host.length > 1 ? host[host.length-2] : ''; // before .cn or .com and so on  is host 
					
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
					
					
					var rule = ["drmcmm.baidu.com","cpro.baidu.com","z.alimama.com","static.googleadsserving.cn"];
					// 百度广告
					
					for(var index in rule ){
						ads = ads.concat(slice.apply(document.querySelectorAll('body img[src*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body embed[src*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body a[href*="'+rule[index]+'"]')))
						 .concat(slice.apply(document.querySelectorAll('body iframe[src*="'+rule[index]+'"]')));
					};
					
					
					
					// 外部flash 
					var flash = document.querySelectorAll('body embed[src]');
					for(var i = 0; i<flash.length ;i++ ){
						this.isAdsDomain(flash[i].src) && (flash[i].src.indexOf(baidu1) == -1) && ads.push(flash[i]);
					}
					
					return ads;
				},
				remove :function (node){
						node.parentNode.removeChild(node);
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
					console.log("start ... ID :"+document.location.href );
					var _seft = this;
					var timeOut = 3000;
					var times = 0;
					setTimeout (function (){
						var ads  =  _seft.clear();
						console.log(" removed:  " + ads.length + " in ID :"+document.location.href );
						times++ <= 5 ?  setTimeout(arguments.callee,timeOut) : console.log("stop ... ID :" +document.location.href);
					},0);
				}
		};
	
		innerScript.init().start();
	
	};
	
	// need set a global flag to decide it had initialized  because property of all_frames is true 
	
	win["chj_clear_ads_flag"] ||  (win["chj_clear_ads_flag"] = true);
	win["chj_check_clear_ads_flag"] ||  (win["chj_check_clear_ads_flag"] = true);
	
	// one page one attach events
	if(win["chj_clear_ads_flag"]){
		var checked = "icon.png";
		var unchecked = "unchecked.png";
		chrome.browserAction.onClicked.addListener(function (){
			win["chj_check_clear_ads_flag"] ? 
					(win["chj_check_clear_ads_flag"] = false || chrome.browserAction.setIcon({path:unchecked}))  // close
					: (win["chj_check_clear_ads_flag"] = true || chrome.browserAction.setIcon({path:checked})); // start
		});
	}
	
	win["chj_check_clear_ads_flag"] && clearAds();
	
})(window);

console.log(111);
	