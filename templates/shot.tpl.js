var _markup =
    "<li class='display-cell' data-key='${ _key }'>" +
        "<img src='${ fileUrl }' width='140' />" +
        "&nbsp;&nbsp;&nbsp;" +
        "<a href='#' class='red js-remove-model' data-model-store='experiences/${ parentId }/shots' data-key='${ _key }'>x</a>" +
        "<div class='grid'>" +
            "<div class='col col-6'>" +
                "<span class='small'>${ numWereHere } people were here</span><br />" +
                "<button class='js-update-numeric-val small' data-num-updt-type='incr' data-model-store='experiences/${ parentId }/shots/${ _key }/numWereHere'>I was here...</button>" +
                "<button class='js-update-numeric-val small' data-num-updt-type='decr' data-model-store='experiences/${ parentId }/shots/${ _key }/numWereHere'>I wasn't here...</button>" +
                "<br />" +
            "</div>" +
            "<div class='col col-6'>" +
                "<span class='small'>${ numWishWereHere } people wished they were here</span><br />" +
                "<button class='js-update-numeric-val small' data-num-updt-type='incr' data-model-store='experiences/${ parentId }/shots/${ _key }/numWishWereHere'>I wish I was here...</button>" +
                "<button class='js-update-numeric-val small' data-num-updt-type='decr' data-model-store='experiences/${ parentId }/shots/${ _key }/numWishWereHere'>I don't wish I was here...</button>" +
                "<br />" +
            "</div>" +
        "</div>" +
        "<em class='small'><strong>${ owner }</strong> : ${ caption }</em> <br />" +
        "<span class='small'>Created on ${ createdOn } | Last modified on ${ lastModifiedOn }</span><br /><br />" +
        "Comments (${ numComments }):" +
        "<ul>{{html commentsHtml}}</ul>" +
    "</li>";


// Register this template:
$.template( "shot", _markup );