var extention = ".php";
var host = "http://localhost:8080/sebenzagit/website/Api/";
//var host = "http://ndu-systems.net/demo/03/Api/";

function GetApiUrl(serviceName) {
    var url = host + serviceName + extention;
    return url;
}
function GetHost(data) {
    return host + "" + data;
}

