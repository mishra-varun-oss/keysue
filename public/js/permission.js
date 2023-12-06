const permission_form = document.querySelector("#permission_form");
const permission_tbody = document.querySelector("#permission_tbody");

async function post(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'post', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	return response.json();
}
function load_roles() {
	let url = 'https://jalfry.com/api/get_roles?domain=keysue';
	fetch(url)
	.then(response => response.json())
	.then((data) => {
		if (data.success) {
			permission_tbody.innerHTML = '';
			data.result.forEach((result) => {
				let row = permission_tbody.insertRow(0);

				let c1 = row.insertCell(0);
				c1.textContent = result.role;

				let c2 = row.insertCell(1);
				c2.textContent = result.description;

				let c3 = row.insertCell(2);
				c3.textContent = 'Delete';
				c3.addEventListener('click', () => { delete_role(result.id) });
			})
		}
	})
}
function delete_role(id) {
	let url = 'https://jalfry.com/api/delete_role';
	post(url, { id: id })
	.then((data) => {
		if (data.success) {
			load_roles()
		}
	})
}
permission_form.addEventListener("submit", (e) => {
	e.preventDefault();
	let name_input = document.querySelector("#name");
	let desc_input = document.querySelector("#desc");
	let obj = {
		domain: 'keysue',
		name: name_input.value,
		description: desc_input.value
	}
	post('https://jalfry.com/api/create_role', obj)
	.then((data) => {
		if (data.success) {
			load_roles();
			name_input.value = '';
			desc_input.value = '';
		}
	})
})
window.onload = () => {
	load_roles();
}
