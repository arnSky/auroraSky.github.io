function setCookie( c_key, c_val, c_expires_millisec )
{
    var d = new Date();
    d.setTime(d.getTime() + (c_expires_millisec));
    var expires = "expires="+d.toUTCString();
    document.cookie = c_key + "=" + c_val + "; " + expires;
}

function getCookie( c_key )
{

}

function deleteCookie( c_key )
{
    document.cookie = c_key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}