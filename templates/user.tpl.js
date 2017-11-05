var _markup =
    "<li class='display-cell' data-key='${ _key }'>" +
        "${ fname } ${ lname } <br />" +
        "<em>@${ username }</em> <br />" +
        "[${ email }] <br />" +
        "<a href='#' class='red js-remove-model' data-model-store='users' data-key='${ _key }'>x</a> <br /><br />" +
    "</li>";


// Register this template:
$.template( "user", _markup );