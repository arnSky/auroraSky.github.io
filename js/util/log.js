//============ Log System ======================
var Log = {
    buffer : [],
    buffer_size : 10,
    d : function( arg_tag, arg_msg )
    {
        this.storeMessage( "[Debug]:[" + arg_tag + "] : [" + arg_msg + "]" );
    },
    e : function( arg_tag, arg_msg )
    {
        this.storeMessage( "[Error]:[" + arg_tag + "] : [" + arg_msg + "]" );
    },
    storeMessage: function( arg_message )
    {
        if ( this.buffer.length > this.buffer_size )
        {
            this.buffer.shift();
        }
        var d_time = new Date();
        this.buffer.push("[" + d_time.getHours() + ":" + d_time.getMinutes() + ":" + d_time.getSeconds() + "]" + arg_message );
        this.printMessage();

    },
    printMessage : function()
    {
        var div_log = document.getElementById( "sys_log" );

        div_log.innerHTML = "";
        for ( index=0; index < this.buffer.length; index++ )
        {
            div_log.innerHTML += "<br>";
            div_log.innerHTML += this.buffer[ index ];
        }
    }
};

function Logger( log_target_element_id ) {
    this.log_target = document.getElementById( log_target_element_id );
}
//=============================================== END Of Log System