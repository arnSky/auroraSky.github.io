function toggleVisibilityById(element_id) {
    var target_element = document.getElementById(element_id);
    if( target_element.hidden ){

        target_element.hidden = false;
    }else{

        target_element.hidden = true;
    }
}
function hideElementById( element_id ){
    var target_element = document.getElementById(element_id);
    target_element.hidden = true;
}

function showElementById( element_id ){
    var target_element = document.getElementById(element_id);
    target_element.hidden = false;
}
