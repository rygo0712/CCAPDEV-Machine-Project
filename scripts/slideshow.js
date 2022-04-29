let i = 0;
let str = null;
const timer = ms => new Promise(res => setTimeout(res, ms))

async function slideShow() {
	while(true){
		str = "url("  + "images/" + i.toString() + ".jpg)";
		document.getElementById("slideshow").style.backgroundImage = str;
		if(i < 3)
			i++;
		else
			i = 0;
		await timer(8000);
	}
}