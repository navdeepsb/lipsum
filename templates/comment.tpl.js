var _markup =
    "<li class='display-cell' data-key='${ _key }'>" +
        "<em><strong>@${ owner.split( '@' )[ 1 ] }</strong></em><br />" +
        "${ content }" +
        "&nbsp;&nbsp;&nbsp;" +
        "<a href='#' class='red js-remove-model' data-model-store='experiences/${ grandParentId }/shots/${ parentId }/comments' data-key='${ _key }'>x</a><br />" +
        "<span class='small'>Created on ${ createdOn } | Last modified on ${ lastModifiedOn }</span><br />" +
        "Up votes: ${ numUpvotes }<br />" +
        "<button class='js-update-numeric-val small' data-num-updt-type='incr' data-model-store='experiences/${ grandParentId }/shots/${ parentId }/comments/${ _key }/numUpvotes'>+1</button>" +
        "<button class='js-update-numeric-val small' data-num-updt-type='decr' data-model-store='experiences/${ grandParentId }/shots/${ parentId }/comments/${ _key }/numUpvotes'>-1</button>" +
        "<br /><br />" +
    "</li>";


// Register this template:
$.template( "comment", _markup );