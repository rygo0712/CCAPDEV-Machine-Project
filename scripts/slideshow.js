async function slideShow() {
	let i_slideshow = 0;
	let str = null;
	const timer = ms => new Promise(res => setTimeout(res, ms));
	while(true){
		str = "url("  + "images/" + i_slideshow.toString() + ".jpg)";
		document.getElementById("slideshow").style.backgroundImage = str;
		if(i_slideshow < 3)
			i_slideshow++;
		else
			i_slideshow = 0;
		await timer(3000);
	}
}