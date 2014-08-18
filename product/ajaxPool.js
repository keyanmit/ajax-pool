var ajaxPool =  function(requestArray,onComplete,onFailure,onSuccess,onAlways){

	var timeStamap = Date.now();
	var poolCount = 0;
	var doneCount = 0;
 	var self = this; 	

	self.add = function(){

	};

	self.result = {
		success : 0		
	}

	var validateInputParam = function(){
		if(onComplete === undefined){
			onComplete = function(){};
		}
		if(onFailure === undefined){
			onFailure = function(){};
		}
		if(onAlways === undefined){
			onAlways = function(){};
		}
		if(onSuccess === undefined){
			onSuccess = function(){};
		}
	};
	validateInputParam();

	var validateRequest = function(req){		
		if(req.success === undefined){
			req.success = onSuccess;
		}
		if(req.fail === undefined){
			req.fail = onFailure;
		}
		if(req.always === undefined){
			req.always = onAlways;
		}
		if(req.success === undefined){
			req.success = onSuccess;
		}
		return req;
	};

	self.run = function(){

		poolCount = requestArray.length;
		doneCount = 0;

		$(requestArray).each(function(idx,req){
			
			req = validateRequest(req);

			$.ajax(req.url)
			.done(function(data){
				req.success(data);
				doneCount = doneCount + 1;
			}).fail(function(data){
				req.fail(data);
			}).always(function(data){
				req.always(data);
				poolCount = poolCount - 1;
				if(poolCount == 0){
					self.result = {
						success : doneCount
					}
					onComplete(self.result);
				}
			});
		});
	};
}