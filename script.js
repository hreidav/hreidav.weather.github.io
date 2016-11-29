
$(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });
});



$(function() {

	var APPID = "0c3ed5d45f3e7a0fec078a1a5f4e45ef";
			/*Обробка події натиснення на кнопку*/
	$('#send').click(function() {
		var cityname = $('#cityname').val();

		/*на поточну добу*/
		$.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + APPID, function(data) {
			$('#selectedcity').html(cityname);
			/*відображення дня тижня на закладці поточного дня*/
			$('#todays').html(function() { /*визначання тексту дня тижня*/
               var day;
               d=data.dt;
               d=new (Date);
               switch (d.getDay()) {
                 case 0: day = "НEДIЛЯ"; break;
                 case 1: day = "ПОНЕДIЛОК"; break;
                 case 2: day = "ВIВТОРОК"; break;
                 case 3: day = "СЕРЕДА"; break;
                 case 4: day = "ЧЕТВЕР"; break;
                 case 5: day = "П'ЯТНИЦЯ"; break;
                 case 6: day = "СУБОТА";}
               return (day);
            }); 
			/*погодні умови*/
			$('#clouddescr').html(function() { /*переклад українською мовою*/
		if (data.weather[0].description==="moderate rain") {data.weather[0].description="незначний дощ"; document.getElementById("weath_pict").src="img/moderate_rain.jpg"};
                if (data.weather[0].description==="light rain") {data.weather[0].description="дрібний дощ"; document.getElementById("weath_pict").src="img/light_rain.jpg"};
                if (data.weather[0].description==="clear sky") {data.weather[0].description="чисте небо"; document.getElementById("weath_pict").src="img/clear_sky.jpg"};
                if (data.weather[0].description==="broken clouds") {data.weather[0].description="купчасті хмари"; document.getElementById("weath_pict").src="img/broken_clouds.jpg"};
                if (data.weather[0].description==="overcast clouds") {data.weather[0].description="густі хмари"; document.getElementById("weath_pict").src="img/overcast_clouds.jpg"};
                if (data.weather[0].description==="scattered clouds") {data.weather[0].description="незначна хмарність"; document.getElementById("weath_pict").src="img/scattered_clouds.jpg"};
                if (data.weather[0].description==="few clouds") {data.weather[0].description="поодинокі хмари"; document.getElementById("weath_pict").src="img/few_clouds.jpg"};
                if (data.weather[0].description==="light snow") {data.weather[0].description="слабкий сніг"; document.getElementById("weath_pict").src="img/light_snow.jpg"};
                if (data.weather[0].description==="mist") {data.weather[0].description="туман"; document.getElementById("weath_pict").src="img/mist.jpg"};
                if (data.weather[0].description==="fog") {data.weather[0].description="туманність"; document.getElementById("weath_pict").src="img/mist.jpg"};
                if (data.weather[0].description==="snow") {data.weather[0].description="сніг"; document.getElementById("weath_pict").src="img/snow.jpg"};  
                return (data.weather[0].description);
                            				});
				
			/*хмарність іконка*/
			$('#cloudimg').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
			/*температура*/
			$('#temp').html(Math.floor((data.main.temp - 273.15).toFixed(2))+" ℃");
			/*тиск*/
			$('#pressure').html(Math.floor(data.main.pressure*0.75)+" мм.рт.ст.");
			/*вологість*/
			$('#humidity').html(Math.floor(data.main.humidity)+" %");
			/*швидкість вітру*/
			$('#windspeed').html(Math.floor(data.wind.speed)+" м/с");
			/*схід сонця*/
			/*$('#sunrise').html((data.sys.sunrise)+" (год:хв)");
			/*захід сонця*/
			/*$('#sunset').html((data.sys.sunset) +" (год:хв)");*/
		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});

		$('#weathervals').remove();


/*прогноз на 5 діб*/
		$.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&APPID=' + APPID, function(data) {

/*вибірка даних на 5 діб*/
			function weathval(index) {
				return '<p id="clouddescr">' + data.list[index].weather[0].description + '</p><img id="cloudimg" src="http://openweathermap.org/img/w/' + data.list[index].weather[0].icon + '.png"><p id="temp">' + Math.floor((data.list[index].main.temp - 273.15).toFixed(2)) + '</p><p id="pressure">' + Math.floor(data.list[index].main.pressure*0.75) + '</p><p id="humidity">' + Math.floor(data.list[index].main.humidity) + '</p><p id="windspeed">' + Math.floor(data.list[index].wind.speed) + '</p>'
			}
			
			$('#tab-2').append('<div id="weathervals" style="width:' + (screen.width-320) + 'px"></div>');

/*динамічне створення нових елементів*/
			for (var i = 0; i < data.list.length; i++) {

				if (i == 0) {
					/*день тижня + дата*/
					$('#weathervals').append('<div id="date">' + data.list[i].dt_txt.substring(0, 10) + '<br></div>');
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-top: 1.5px solid blue">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));
					continue;
				}

				if (data.list[i].dt_txt.substring(0, 10) != data.list[i-1].dt_txt.substring(0, 10)) {
					/*$('#weathervals').append('<div id="day">' + data.list[i].dt_txt.substring(0, 10) + '<br></div>'); /*перетворення дати в день*/
					$('#weathervals').append('<div id="date">' + data.list[i].dt_txt.substring(0, 10) + '<br></div>');
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-top: 1.5px solid blue">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));
				}

				if (data.list[i].dt_txt.substring(0, 10) == data.list[i-1].dt_txt.substring(0, 10)) {
					$('#date:last-child').append('<div class="time" id="time-' + i + '" style="border-left: 1.5px solid blue; border-top: 1.5px solid blue">' + data.list[i].dt_txt.substring(10, 16) + '</div>');
					$('#time-' + i).append('<div id="weathval"></div>').append(weathval(i));	
				}
			}

		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});


	});
});
