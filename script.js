
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
	
	$('#send').click(function() {
		var cityname = $('#cityname').val();

		/*на поточну добу*/

		$.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&APPID=' + APPID, function(data) {
			$('#selectedcity').html(cityname);
			/*відображення дня тижня на закладці поточного дня*/
			$('#todays').html(function() { 
               var day;
               d=data.dt;
               d=new (Date);
               switch (d.getDay()) {
                 case 0:
                  day = "Неділя";
                  break;
                 case 1:
                  day = "Понеділок";
                  break;
                 case 2:
                  day = "Вівторок";
                  break;
                 case 3:
                  day = "Середа";
                  break;
                 case 4:
                  day = "Четвер";
                  break;
                 case 5:
                  day = "П'ятниця";
                  break;
                 case 6:
                  day = "Субота";
               }
               return (day);
            }); 
			/*погодні умови*/
			$('#clouddescr').html(data.weather[0].description);
			/*хмарність іконка*/
			$('#cloudimg').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
			/*температура*/
			$('#temp').html(Math.floor((data.main.temp - 273.15).toFixed(2)));
			/*тиск*/
			$('#pressure').html(Math.floor(data.main.pressure));
			/*вологість*/
			$('#humidity').html(Math.floor(data.main.humidity));
			/*швидкість вітру*/
			$('#windspeed').html(Math.floor(data.wind.speed));
			/*схід сонця*/
			$('#sunrise').html(data.sys.sunrise);
			/*захід сонця*/
			$('#sunset').html(data.sys.sunset);
		}, 'json').done(function() {
			console.log('Request completed successfully');
		}).fail(function() {
			console.log('Request is failure');
		});

		$('#weathervals').remove();


/*прогноз на 5 діб*/
		$.get('http://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&APPID=' + APPID, function(data) {

			function weathval(index) {
				return '<p id="clouddescr">' + data.list[index].weather[0].description + '</p><img id="cloudimg" src="http://openweathermap.org/img/w/' + data.list[index].weather[0].icon + '.png"><p id="temp">' + (data.list[index].main.temp - 273.15).toFixed(2) + '</p><p id="pressure">' + data.list[index].main.pressure + '</p><p id="humidity">' + data.list[index].main.humidity + '</p><p id="windspeed">' + data.list[index].wind.speed + '</p>'
			}
			
			$('#tab-2').append('<div id="weathervals" style="width:' + (screen.width-320) + 'px"></div>');

			for (var i = 0; i < data.list.length; i++) {

				if (i == 0) {
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

/*function() {
	var ;
return
}*/