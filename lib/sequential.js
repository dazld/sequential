var noop = function(){};

function runner (handler, handlerArgs, timer) {

	// make sure we are not clobbering something else's data
	var localArgs = JSON.parse(JSON.stringify(handlerArgs)) || [];

	var executor = function executor(){
		if (localArgs.length) {
			setTimeout(function(){
				handler.call(null, localArgs[0]);
				localArgs.shift();
				executor();
			}, timer);
		} else {
			return false;
		}
	}

	return executor;
}

module.exports = runner;