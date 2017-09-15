var extention = ".php";
//var host = "http://localhost:8080/Api_Sebenza/";
var host = "http://localhost:8080/sebenza/Api_Sebenza/"; //<--Nduduzo Host
//var host = "http://possibility.org.za/Api/";

function GetApiUrl(serviceName) {

    var url = host + serviceName + extention;
    return url;
}
function GetHost(data) {
    return host + "" + data;
}

