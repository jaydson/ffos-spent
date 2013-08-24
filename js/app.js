(function () {
	var Spent = function () {

		var storageName = 'ffos-espent-userdata',
			currentData = JSON.parse(localStorage.getItem(storageName) || '[]');

		function validate (data) {
			return data.howmuch ? true : false;
		}

		this.getReport = function () {
			var data = localStorage.getItem(storageName);

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

	document.querySelector('#ok').addEventListener('click', function () {
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
	});

	document.querySelector('#report').addEventListener('click', function () {
		document.querySelector('#report-content').innerHTML = new Spent().getReport();
	});

}());

document.addEventListener('DOMComponentsLoaded', function(){
	
});

