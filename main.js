var current_dir = "~";

function process() {
	$(".command:last").prop("readonly", true);
	var command_parsed = ($(".command:last").val()).split(" ");
	switch (command_parsed[0]) {
		case "cd":
			if (command_parsed.length == 1) {
				$("#output").append("<p>" + $(".command:last").val() + ": command not found</p>");
				append_input();
				return false;
			}
			var subarray = command_parsed.slice(1, command_parsed.length);
			console.log("joined: " + subarray.join(" "));
			process_cd(subarray.join(" "));
			return false;
		case "open":
			if (command_parsed.length == 1) {
				$("#output").append("<p>" + $(".command:last").val() + ": command not found</p>");
				append_input();
				return false;
			}
			var subarray = command_parsed.slice(1, command_parsed.length);
			process_open(subarray.join(" "));
			return false;
		case "ls":
			if (current_dir === "~") {
				$("#output").append("<p>about &nbsp; &nbsp; &nbsp;articles</p>");
				$("#output").append("<p>CTF &nbsp; &nbsp; &nbsp; &nbsp;contact</p>");
			} else if (current_dir === "articles") {
				$("#output").append("<p>type 'open <i>project-name</i>' for more information about any of these articles");
				$("#output").append("<p>HACK THE BOX <span id='articles-1'>shell</span></p>");
			
			}
			append_input();
			return false;
		case "clear":
			$("#output").empty();
			$("input[type=text], textarea").val("");
			$(".command").prop("readonly", false);
			$(".command:last").focus();
			return false;
		case "help":
			$("#output").append("<p>ls <span class='blue' id='help-ls'>- list the menu sections</span></p>");
			$("#output").append("<p>cd <i>section-name</i> <span class='blue' id='help-cd'>- change to section 'section-name'</span></p>");
			$("#output").append("<p>cd .. <span class='blue' id='help-cd2'>- change back to previous section</span></p>");
			$("#output").append("<p>clear <span class='blue' id='help-clear'>- clear output</span></p>");
			append_input();
			return false;
		default:
			$("#output").append("<p>" + $(".command:last").val() + ": command not found</p>");
			append_input();
			return false;
	}
}

function process_cd(directory) {
	if (current_dir === "~") {
		switch (directory) {
			case "about":
				$("#output").append("<p id='about'>We are a team focused on Cybersecurity and IT stuff born in Brazil.</p>");
				$("#output").append("<p>-------------------------------------------------</p>");
				$("#output").append("<p>type 'cd ..' to return home</p>");
				current_dir = "about";
				append_input();
				return false;
			case "articles":
				current_dir = "articles";
				$("#output").append("<p>type 'ls' for a list of articles</p>");
				$("#output").append("<p>type 'cd ..' to return</p>");
				append_input();
				return false;
			case "CTF":
				current_dir = "CTF";
				$("#output").append("<p><a href='https://ctftime.org/event/570'>EvlzCTF CTF</a>, We are going to participate! <span class='blue'>feb '06</span>");
				append_input();
				return false;
			case "contact":
				current_dir = "contact";
				$("#output").append("<p><a href='mailto:contact@gs2w.org'>email</a></p>");
				append_input();
				return false;
			case "repository":
				current_dir = "repository";
				$("#output").append("<p><a href='https://github.com/gs2win'>https://github.com/gs2win</a></p>");
				$("#output").append("<p>type 'cd ..' to return</p>");
				append_input();
				return false;
			default: 
				$("#output").append("<p>no such file or directory</p>");
				append_input();
				return false;
		}
	} else {
		if (directory === "..") {
			current_dir = "~";
			$("#output").append("<br>");
		} else {
			$("#output").append("<p>no such file or directory</p>");
		}
		append_input();
	}
}

function process_open(file) {
	if (current_dir === "articles") {
		switch (file) {
			case "bookmarks feed":
				$("#output").append("<p><span class='blue'>feb '06</span> | <a href='http://hackthebox.eu'>HACK THE BOX</a></p>");
				$("#output").append("<p>We have our own team (GS2W) on Hack The Box platform!</p>");
				append_input();
				return false;
			
			default:
				$("#output").append("<p>no such file or directory</p>");
				append_input();
				return false;
		}
	} else {
		$("#output").append("<p>no such file or directory</p>");
		append_input();
	}
}

function append_input() {
	$("#output").append("<div class='terminal_line'>:" + current_dir + "$ &nbsp; <form name='terminal' action='#' method='post' onsubmit='return process()'><input type='text' class='command'></form></div>");
	$(".command:last").focus();
}


function showTerminal(selector) {
	console.log(selector);
	$(selector).hide();
	$("#terminal").show();
}

function showPage(selector) {
	console.log("showpage");
	$("#terminal").hide();
	$(selector).show();
}

