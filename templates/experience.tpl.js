var _markup =
    "<li class='display-cell' data-key='${ _key }'>" +
        "<u>${ xpName }</u>" +
        "&nbsp;&nbsp;&nbsp;" +
        "<a href='#' class='red js-remove-model' data-model-store='experiences' data-key='${ _key }'>x</a><br />" +
        "by ${ owner }<br />" +
        "[${ category }]<br />" +
        "<span class='small'>Created on ${ createdOn } | Last modified on ${ lastModifiedOn }</span><br />" +
        "No. of shots = ${ numShots }<br />" +
        "<ul>{{html shotsHtml}}</ul>" +
        "<br /><br />" +
        "------" +
        "<br /><br />" +
    "</li>";


// Register this template:
$.template( "experience", _markup );