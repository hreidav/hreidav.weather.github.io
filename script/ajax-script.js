$(function() {


	var APPID = "432716d2147398a224b3164c68a87d16";
	
	$('#button_find').click(function() {
		var cityname = $('#cityname').val();

		$.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + APPID, function(data) {
			$('#selectedcity').html(data.name);
			$('#clouddescr').html(data.weather[0].description);
			$('#cloudimg').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
			$('#temp').html(data.main.temp - 273.15);
			$('#pressure').html(data.main.pressure);
			$('#humidity').html(data.main.humidity);
			$('#windspeed').html(data.wind.speed);
		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});
	});
});
