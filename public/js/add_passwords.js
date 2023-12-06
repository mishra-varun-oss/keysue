const permissions_div = document.querySelector("#permissions_div");
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function load_roles() {
	let url = 'https://jalfry.com/api/get_roles?domain=keysue';
	fetch(url)
	.then(response => response.json())
	.then((data) => {
		permissions_div.innerHTML = '';
		if (data.success) {
			data.result.forEach((result) => {
				let input = document.createElement('input');
				let input_id = makeid(5);
				input.id = input_id;
				input.type = 'checkbox';
				input.value = result.role;
				input.name = 'permission_input';
				
				let label = document.createElement('label');
				label.textContent = result.role;
				label.htmlFor = input_id;
				
				permissions_div.appendChild(input);
				permissions_div.appendChild(label);
			})
		}
	})
}
window.onload = () => {
	load_roles();
}
