var debug = false;

var check_update_url = "/check_update.json";
var update_user_status_interval = 30000;

function send_xhr(url, params)
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);

  // Send Header
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(params);
}

var update_user_status = function()
{
  send_xhr(check_update_url, "");
  
  if (debug == true)
  {
	console.log("GP DEBUG: User Status Updated!");
  }
};

setInterval(update_user_status, update_user_status_interval);