var connection_pool;

//============= PostData type ===================
function PostData()
{
    this.post_pairs = [];
    this.addPair = function( arg_lhs, arg_rhs )
    {
        this.post_pairs.push( arg_lhs + "=" + arg_rhs );
    };
    this.getPostString = function()
    {
        var response_string = "";
        response_string += this.post_pairs[0];
        for( index=1; index < this.post_pairs.length; index++ )
        {
            response_string += "&" + this.post_pairs[ index ];
        }
        return response_string;
    }
}
//============================================== End Of PostData type

//============== ConnectionPool type ============
var ConnectionFlags = {
    CONNECTION_IN_USE : 1000
}
function ConnectionPool( arg_connection_count )
{
    this.xml_http_pool = [];

    this.connection_count = arg_connection_count;

    this.getConnectionIndex = function()
    {
        var response_index = null;
        for( index = 0; index < this.connection_count; index++ )
        {
            if ( this.xml_http_pool[ index ] === undefined )
            {
                this.xml_http_pool[ index ] = ConnectionFlags.CONNECTION_IN_USE; // Value over-ridden by XmlHttpRequest in method postToServer
                // and deleted/undefined after connection is freed
                response_index = index;
                break;
            }
            else{
                //... Connection Index in Use
                //... Probably loops until connection is available
                //... todo: verify what happens if no free connection is available ...

            }
        }
        return response_index;
    }
    this.freeConnection = function( arg_connection_index )
    {
        //IMPORTANT: should be called by callback function in AJAX request
        delete this.xml_http_pool[ arg_connection_index ];
    }
};
//=========================================== END Of ConnectionPool Type

function postToServer( arg_target_url, arg_post_data, arg_callback_function, xml_http_object_index )
{
    //... todo: Check whether connection pool is initialized or not ...
    //... todo: check whether xml_http_object_index has value or not and compensate accordingly ...
    if ( window.XMLHttpRequest )
    {
        //... Regular New Browsers ...
        connection_pool.xml_http_pool[ xml_http_object_index ] = new XMLHttpRequest();
    }
    else{
        //... (very) Old Browsers ...
        connection_pool.xml_http_pool[ xml_http_object_index ] = new ActiveXObject( "Microsoft.XMLHTTP" );
    }

    connection_pool.xml_http_pool[ xml_http_object_index ].onreadystatechange = arg_callback_function;

    connection_pool.xml_http_pool[ xml_http_object_index ].open( "POST", arg_target_url , true );
    connection_pool.xml_http_pool[ xml_http_object_index ].setRequestHeader( "Content-type","application/x-www-form-urlencoded" );
    connection_pool.xml_http_pool[ xml_http_object_index ].send( arg_post_data );
}
//==================================================================================================================================