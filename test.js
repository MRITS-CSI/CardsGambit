const moment = require('moment');

let a = moment(
	moment(new Date(Date.now())).diff(
		moment(new Date(Date.now())).add(10, 'seconds')
	)
).format('s');
console.log(a === '49');
