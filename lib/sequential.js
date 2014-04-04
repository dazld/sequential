var noop = function(){};


function runner (handler, handlerArgs, timer) {

	// make sure we are not clobbering something else's data
	var localArgs = JSON.parse(JSON.stringify(handlerArgs)) || [];

	var chainedFunctions = [];

	var executor = function executor(){
		if (localArgs.length) {
			setTimeout(function(){
				var callArgs = localArgs.shift();
				handler.call(null, callArgs);
				executor();
			}, timer);
		} else {
			chainedFunctions.forEach(function(chained){
				chained.fn.apply(null, chained.args);
			});
		}
	};

	var chain = {
		then: function(fn){
			var rest = [].slice.call(arguments, 1);
			chainedFunctions.push({
				fn: fn,
				args: rest
			});
			return chain;
		}
	};
	

	var toRet = function(){
		executor();
		return chain;
	};

	toRet.then = chain.then;

	return toRet;
}

module.exports = runner;