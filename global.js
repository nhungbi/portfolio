console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}
// part 2
// // list of all of the nav links
// const navLinks = $$("nav a")

// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)

// // add current class to current page link
// // if (currentLink) { // or if (currentLink !== undefined)
// // 	currentLink.classList.add("current");
// // }
// currentLink?.classList.add("current");

// part 3: automatic navigaion menu
let pages = {
	"": "Home",
	/* add the rest of your pages here */
	"projects/": "Projects",
	"resume/": "Resume",
	"contact/": "Contact",
};

let nav = document.createElement("nav");
nav.classList.add('nav-bar')
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let url in pages) {
	let title = pages[url];


	if (!ARE_WE_HOME && !url.startsWith("http")) {
		console.log('not home')
		url = "../" + url;
	}

	if (location.host !== "127.0.0.1:5500") { // if on hosted, then need "/portfolio"
		url = "portfolio/" + url
	}

	if (!ARE_WE_HOME && location.host !== "127.0.0.1:5500") { // if not on hosted
		console.log('not home 1')
		url = "../" + url
	}
	// url = ARE_WE_HOME && !url.startsWith("http") ? url : "../" + url;
	console.log(location, url)

	let a = document.createElement("a");
	a.href = url;
	a.textContent = title;
	// check for current
	if (a.host === location.host && a.pathname === location.pathname) {
		a.classList.add("current");
	} else {
		a.target = "_blank";
	}
	a.classList.add('nav-link')
	// a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);

	
	nav.append(a);
}

// step 4: dark mode
document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
			<option value='light dark'> Automatic </option>
			<option value='light'> Light </option>
			<option value='dark'>  Dark </option>
		</select>
	</label>`
);

const select =  document.querySelector("select");
select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
	document.documentElement.style.setProperty("color-scheme", event.target.value);
	// save preference
	localStorage.colorScheme = event.target.value;

});

if ("colorScheme" in localStorage) {
	document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
	select.value = localStorage.colorScheme;
}







