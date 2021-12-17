const moment = require('moment');

let a = moment(
	moment(new Date(Date.now())).diff(
		moment(new Date(Date.now())).add(10, 'seconds')
	)
).format('s');
console.log(a === '49');

const timeout = setTimeout(async () => {
	try {
		if (window.sessionStorage.getItem('jwt')) {
			let { data } = await API.patch('/user', {
				jwt: window.sessionStorage.getItem('jwt'),
				score: `${props.score}`,
			});
			data.status === 'ok' && alert('Form Submitted Successfully');
			data.status || alert(data.message);

			window.location.pathname = '/';
			window.sessionStorage.removeItem('jwt');
		} else {
			alert('Error !!! , Contact CSI Team ASAP !!!');
		}
	} catch (err) {
		alert(err.message);
	}
}, 7 * 60 * 1000);
