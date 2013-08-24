(function () {
	var Spent = function () {

		var storageName = 'ffos-espent-userdata',
			currentData = JSON.parse(localStorage.getItem(storageName) || '[]');

		function validate (data) {
			return data.howmuch ? true : false;
		}

		this.getReport = function () {
			var data = JSON.parse(localStorage.getItem(storageName) || []),
				i = 0,
				dataLen = data.length,
				dataHTML = '';
			for (i; i < dataLen; i += 1) {
				dataHTML += "<tr><td>"+ data[i].date +"</td><td>"+ data[i].howmuch +"</td><td>"+ data[i].tags +"</td><td>"+ data[i].notes +"</td></tr>"
			}
			return dataHTML;
		};

		this.save = function (obj, cb) {
			if (validate(obj)) {
				currentData.push(obj);
				localStorage.setItem(storageName, JSON.stringify(currentData));
				cb.call(this, currentData);
			} else {
				cb.call(this, 'error');
			}
		};		
	};

	document.querySelector('#ok').addEventListener('click', function (event) {
		var date = new Date();
		var ispent = new Spent().save({
			howmuch : document.querySelector('#howmuch').value,
			tags : (function(){
				var tagsElsList = document.querySelectorAll('input[name=tags]:checked'),
					tagsElsListLen = tagsElsList.length,
					tagsList = [],
					i = 0;
					for (i; i < tagsElsListLen; i += 1) {
						tagsList.push(tagsElsList[i].value);
					};
					return tagsList;
			})(),
			notes : document.querySelector('#notes').value,
			date : date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear(),
			exported : false	
		}, function (status) {
			document.querySelector('#form-user').reset();
		});

		event.preventDefault();
		event.stopPropagation();
	});


	document.addEventListener('DOMComponentsLoaded', function(){

		document.querySelector('#report').addEventListener('click', function (event) {
			document.querySelector('#report-content').innerHTML = new Spent().getReport();
			event.preventDefault();
			event.stopPropagation();
			document.getElementById('fBox').toggle();
		});
		document.getElementById('flip-back').addEventListener('click', function (event) {
			event.preventDefault();
			event.stopPropagation();
			document.getElementById('fBox').toggle();
		});
		
	});

}());


