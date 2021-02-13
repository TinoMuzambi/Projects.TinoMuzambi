const projects = [
	{
		name: "cubingalgos",
		shortname: "CA",
		title: "Cubing Algos",
		content: [
			`A simple website showing cubing algorithms for 2-look OLL & PLL.`,
			`This web app uses plain HTML, CSS and vanilla JavaScript. It makes use of CSS grid, CSS flex and many other CSS tools. In terms of HTML, this app uses semantic HTML with the use of tags like header, main and article.`,
			`The JavaScript in this web app is used to enable the use of saving and fetching data from Firebases' Firestore so that the statuses of each algorithm is updated across all clients.`,
			`The project is hosted on Netlify and I've made use of the Netlify badge in my README.`,
		],
	},
	{
		name: "tinomuzambi",
		shortname: "TM",
		title: "TinoMuzambi.com",
		content: [
			`This is my personal website which I use as an online CV. It summarises the different tools and technologies I'm comfortable with as well as my work experience and academic history.`,
			`I recently completely redesigned it from the ground up using React as well as sass for styling.`,
			`The site is deployed using Vercel and connected to my domain which is hosted by GoDaddy.`,
		],
		link: "https://tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/ReactPortfolio",
		keywords: ["html", "sass", "react", "vercel", "javascript", "yarn"],
	},
	{
		name: "working-with-clash",
		shortname: "WC",
		title: "Working With Clash",
		content: [
			`This React app is built to work with the Clash of Clans API. It fetches player or clan information using their respective tags.`,
			`WWC is a full-stack app with the front-end built with React. JSX is used for templating and Sass for styling.`,
			`The back-end consists of an Express server and it handles calling the Clash of Clans API and sending the data to the front-end. No database was implemented for this app.`,
			`The front-end is deployed on Vercel and the back-end on Heroku. Visit the GitHub page to check out the code.`,
		],
		link: "https://wwc.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/WorkingWithClash",
		keywords: [
			"react",
			"html",
			"css",
			"npm",
			"jsx",
			"javascript",
			"heroku",
			"clash of clans",
			"sass",
			"express",
			"full-stack",
			"vercel",
		],
	},

	{
		name: "table-time",
		shortname: "TT",
		title: "Table Time",
		content: [
			`A simple React Table Tennis scoring progressive web app that stores all matches recorded to a database.`,
			`This is a full-stack MERN (MongoDB, Express, React Node.js) app. I used React to build the front end with jsx for the layout and vanilla CSS for styling.`,
			`The front-end hooks up to an Express server back-end. The back-end uses a REST API to get matches from the database as well as to post and delete them.`,
			`The database in question is the NoSQL MongoDB. This database has a cluster which is being hosted online by MongoDB. I am using Mongoose as a client to connect to the cluster.`,
			`I integrated Pusher to make updates to the database realtime. Any update on any device will update across all devices in realtime.`,
			`The most recent update introduced authentication. Users can create accounts and log in. This allows them to have private matches which are only visible to them.`,
			`The back-end is hosted on Heroku and the front-end is deployed on Vercel both with continuous integration from GitHub.`,
			`In future I plan to add statistics from the matches stored in the database as well as a log feature to increase competitiveness.`,
		],
		link: "https://table.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/TableTime",
		keywords: [
			"react",
			"html",
			"css",
			"npm",
			"jsx",
			"javascript",
			"heroku",
			"sports",
			"table tennis",
			"mern",
			"mongodb",
			"pusher",
			"full-stack",
			"vercel",
		],
	},

	{
		name: "projects.tinomuzambi",
		shortname: "PT",
		title: "Projects.TinoMuzambi",
		content: [
			`This React app is a landing page for all the personal projects I've worked on. It provides an overview of each project as well as the tech stack used in each project and where possible, a link to see it in action.`,
			`In terms of the tech stack, this project uses React for the front-end. The repetitive nature of elements made something like React which uses reusable components the perfect tool for this website. I used Bootstrap and CSS3 for styling the page. I used a Javascript library called AOS (Animation on Scroll) for the reveal effects that the wrapper elements have. Icons are from react-icons font-awesome.`,
			`I realise that it's recursive to include this project on this site but this is one of my projects nevertheless. This project is deployed using Vercel and my domain is hosted on GoDaddy`,
		],
		link: "https://projects.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/Projects.TinoMuzambi",
		keywords: [
			"react",
			"html",
			"css",
			"npm",
			"jsx",
			"bootstrap",
			"javascript",
			"json",
			"vercel",
			"godaddy",
		],
	},
	{
		name: "whatsapp-analyser",
		shortname: "WA",
		title: "WhatsApp Chat Analyser",
		content: [
			`This project uses Python to read in exported WhatsApp chat files and perform string manipulation methods to derive stats and insights about the chat in question.`,
			`The tech stack I used on this project is primarily Python. So it made sense to use Flask to create a web interface. So Flask, along with WTForms were my tools for building out the front-end. For styling I used Bootstrap as well as some plain CSS.`,
			`In terms of deployment, I used Heroku to deploy the app. My domain is hosted on GoDaddy.`,
		],
		link: "http://whatsapp-analyserr.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/WhatsAppAnalyser",
		keywords: [
			"flask",
			"python",
			"html",
			"css",
			"bootstrap",
			"heroku",
			"godaddy",
		],
	},
	{
		name: "remove-contractions",
		shortname: "RC",
		title: "Remove Contractions",
		content: [
			`This app takes a body of text as input and replaces any contractions found with their full form. It's built with Python and has a web interface to go with it.`,
			`To bring this Python app to the web, I used Flask to provide a web interface. For the input and output elements, I used WTForms to integrate into the HTML document. Styling is provided with Bootstrap as well as plain CSS3.`,
			`I used Heroku to deploy this app to the web and linked it with a custom domain I have hosted with GoDaddy.`,
		],
		link: "http://remove-contractions.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/RemoveContractions",
		keywords: [
			"flask",
			"python",
			"html",
			"css",
			"bootstrap",
			"heroku",
			"godaddy",
		],
	},
	{
		name: "amount-divider",
		shortname: "AD",
		title: "Amount Divider",
		content: [
			`A simple Python app that divides an amount into n number of uneven partitions. This will help with coming up with amounts for competition prizes for example.`,
			`This was initially a normal Python script that ran from the console but using Flask, WTForms, some Bootstrap and CSS, I made a web interface for it with styling to match.`,
			`Heroku was my deployment tool of choice and I linked it to my custom sub-domain using GoDaddy.`,
		],
		link: "http://amount-divider.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/AmountDivider",
		keywords: [
			"flask",
			"python",
			"html",
			"css",
			"bootstrap",
			"heroku",
			"godaddy",
		],
	},
	{
		name: "blog.tinomuzambi",
		shortname: "BT",
		title: "Blog.TinoMuzambi",
		content: [
			`This is my fully featured, full fledged blog which I regularly contribute to and update. This was a project that really stretched my creativity and imagination to make it visually appealing and I think I pulled it off quite well.`,
			`I recently rebuilt this blog using React because I felt the reusable component architecture of React suits a blog much better. Each blog is held in a JSON array object and each blog component pulls its data from there.`,
			`The blog is now served by Vercel and my custom domain is linked to this site using GoDaddy.`,
		],
		link: "https://blog.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/ReactBlog",
		keywords: [
			"javascript",
			"html",
			"css",
			"vercel",
			"godaddy",
			"react",
			"responsive",
		],
	},
	{
		name: "twibot",
		shortname: "TB",
		title: "TwiBot",
		content: [
			`This is a simple Python script I developed after getting access to the Twitter Developer API. Currently it just echoes what you tweet at it but there's vast potential for it.`,
			`This is a script that makes use of the Twitter Developer API with Python to perform a variety of things using Twitter. Currently it doesn't do anything useful but I'm planning on changing that soon.`,
		],
		link: "",
		github: "https://github.com/TinoMuzambi/TwiBot",
		keywords: ["api", "twitter", "python"],
	},
	{
		name: "go-conversion-tool",
		shortname: "GC",
		title: "Go Conversion Tool",
		content: [
			`This Go script was my first venture into Golang. It's a script that performs a variety of common conversions in both directions.`,
			`I developed the script using pure Go. It allows for conversion between all of the different units you could possibly need.`,
		],
		link: "",
		github: "https://github.com/TinoMuzambi/GoConverstionTool",
		keywords: ["go", "golang"],
	},
	{
		name: "automate-mail",
		shortname: "AM",
		title: "Automate Mail",
		content: [
			`Automate your emails with this simple Python script. This script allows you to send an email at a regular interval. Everything is configurable and you can set it up as you like.`,
			`This script uses the smtplib library in Python to enable sending emails via Python. It's a simple but powerful tool.`,
		],
		link: "",
		github: "https://github.com/TinoMuzambi/AutomateMail",
		keywords: ["email", "python", "smtplib"],
	},
	{
		name: "android-calculator",
		shortname: "AC",
		title: "Android Calculator",
		content: [
			`A simple calculator app for Android that is capable of doing simple arithmetic.`,
			`I developed this app using Kotlin in Android Studio. It performs all normal arithmetic operations complete with an erase and clear button.`,
		],
		link: "",
		github: "https://github.com/TinoMuzambi/Calculator",
		keywords: ["kotlin", "android", "xml"],
	},
	{
		name: "student-number-generator",
		shortname: "SG",
		title: "Student Number Generator",
		content: [
			`This Java program determines UCT student numbers based on name and surname. It was a fun little project that was my first feature on GitHub.`,
			`This is a simple Java program which accepts your name and surname and processes them to return what a sample UCT student number would look like for that name-surname combination.`,
		],
		link: "",
		github: "https://github.com/TinoMuzambi/StudentNumberGenerator",
		keywords: ["java", "uct"],
	},
];

export default projects;
