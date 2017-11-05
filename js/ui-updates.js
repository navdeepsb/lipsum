var DATE_FORMAT = "#MMM# #DD#, #h#:#mm# #ampm#";

var getObjectWithFormattedDates = function( data ) {
    var _dt  = null;

    if( data.createdOn ) {
        _dt = new Date( data.createdOn );
        data.createdOn = _dt.customFormat( DATE_FORMAT );
    }
    if( data.lastModifiedOn ) {
        _dt = new Date( data.lastModifiedOn );
        data.lastModifiedOn = _dt.customFormat( DATE_FORMAT );
    }

    return data;
};


var changeUI = function( elemSelector, tplName ) {
    return {
        appendItem: function( data ) {

            var _html = $.tmpl( tplName, getObjectWithFormattedDates( data ) );
            $( elemSelector ).append( _html );
        },
        updateItem: function( data ) {
            var _html = $.tmpl( tplName, data );

            // $( elemSelector ).find( ".display-cell[data-key=" + data._key + "]" ).html( _html.html() || _html.text() );

            var $oldElem = $( elemSelector ).find( ".display-cell[data-key=" + data._key + "]" ).after( _html.prop( "outerHTML" ) || _html.text() );

            $oldElem.remove();
        },
        removeItem: function( data ) {
            $( elemSelector ).find( ".display-cell[data-key=" + data._key + "]" ).remove();
        }
    };
}



// Users:
// firebaseDb.ref( "users" ).on( "child_added", changeUI( ".js-users", "user" ).appendItem );
// firebaseDb.ref( "users" ).on( "child_changed", changeUI( ".js-users", "user" ).updateItem );
// firebaseDb.ref( "users" ).on( "child_removed", changeUI( ".js-users", "user" ).removeItem );
firebaseDb.ref( "users" ).on( "child_added", function( data ) {
    // Add the category in the list:
    changeUI( ".js-users", "user" ).appendItem( data.val() );

    // Update the dropdown in experience form:
    var _data = data.val();
    var _html = $.tmpl( "dropdown-option", {
        "value": _data._key,
        "displayText": $.tmpl( "db-owner-str", _data ).text()
    });
    $( ".js-users-dropdown" ).append( _html );
});
firebaseDb.ref( "users" ).on( "child_changed", function( data ) {
    // Add the category in the list:
    changeUI( ".js-users", "user" ).updateItem( data.val() );

    // Update the dropdown in experience form:
    var _data = data.val();
    $( ".js-users-dropdown" ).find( "option[data-val=" + _data._key + "]" ).html( $.tmpl( "db-owner-str", _data ).text() );
});
firebaseDb.ref( "users" ).on( "child_removed", function( data ) {
    // Add the category in the list:
    changeUI( ".js-users", "user" ).removeItem( data.val() );

    // Remove the dropdown option:
    var _data = data.val();
    $( ".js-users-dropdown" ).find( "option[data-val=" + _data._key + "]" ).remove();
});



// Categories:
// firebaseDb.ref( "categories" ).on( "child_added", changeUI( ".js-categories", "category" ).appendItem );
// firebaseDb.ref( "categories" ).on( "child_changed", changeUI( ".js-categories", "category" ).updateItem );
firebaseDb.ref( "categories" ).on( "child_added", function( data ) {
    // Add the category in the list:
    changeUI( ".js-categories", "category" ).appendItem( data.val() );

    // Update the dropdown in experience form:
    var _data = data.val();
    var _html = $.tmpl( "dropdown-option", {
        "value": _data._key,
        "displayText":  $.tmpl( "db-category-str", _data ).text()
    });
    $( ".js-cat-dropdown" ).append( _html );
});
firebaseDb.ref( "categories" ).on( "child_changed", function( data ) {
    // Add the category in the list:
    changeUI( ".js-categories", "category" ).updateItem( data.val() );

    // Update the dropdown in experience form:
    var _data = data.val();
    $( ".js-cat-dropdown" ).find( "option[data-val=" + _data._key + "]" ).text( _data.catName );
});



// Experiences:
firebaseDb.ref( "experiences" ).on( "child_added", function( data ) {
    // Add the experience in the list:
    var data       = data.val();
    var shotKeys   = Object.keys( data.shots || {} );
    var commtKeys  = null;
    var _shotsHtml = "";

    data.numShots = shotKeys.length;
    shotKeys.forEach( function( k ) {
        var _dt = data.shots[ k ];
        commtKeys = Object.keys( _dt.comments || {} );

        _dt.numComments = commtKeys.length;
        _shotsHtml += $.tmpl( "shot", getObjectWithFormattedDates( _dt ) ).prop( "outerHTML" );

        // Append comments html:
        _shotsHtml += "<ul>";
        commtKeys.forEach( function( k2 ) {
            _shotsHtml += $.tmpl( "comment", getObjectWithFormattedDates( _dt.comments[ k2 ] ) ).prop( "outerHTML" );
        });
        _shotsHtml += "</ul>";

        // Update value of shots:
        _dt.parentXp = data.xpName;
        $( ".js-shots-dropdown" ).append( $.tmpl( "dropdown-option-shot", getObjectWithFormattedDates( _dt ) ) );
    });
    data.shotsHtml = _shotsHtml;

    changeUI( ".js-experiences", "experience" ).appendItem( data );

    // Update the dropdown in shots form:
    var _html = $.tmpl( "dropdown-option-xp", data );
    $( ".js-xp-dropdown" ).append( _html );
});
firebaseDb.ref( "experiences" ).on( "child_changed", function( data ) {
    // Add the category in the list:
    var data       = data.val();
    var shotKeys   = Object.keys( data.shots || {} );
    var commtKeys  = null;
    var _shotsHtml = "";

    data.numShots = shotKeys.length;
    shotKeys.forEach( function( k ) {
        var _dt = data.shots[ k ];
        commtKeys = Object.keys( _dt.comments || {} );

        _dt.numComments = commtKeys.length;
        _shotsHtml += $.tmpl( "shot", getObjectWithFormattedDates( _dt ) ).prop( "outerHTML" );

        // Append comments html:
        _shotsHtml += "<ul>";
        commtKeys.forEach( function( k2 ) {
            _shotsHtml += $.tmpl( "comment", getObjectWithFormattedDates( _dt.comments[ k2 ] ) ).prop( "outerHTML" );
        });
        _shotsHtml += "</ul>";

        // Update value of shots:
        _dt.parentXp = data.xpName;
        $( ".js-shots-dropdown" ).append( $.tmpl( "dropdown-option-shot", getObjectWithFormattedDates( _dt ) ) );
    });
    data.shotsHtml = _shotsHtml;

    changeUI( ".js-experiences", "experience" ).updateItem( getObjectWithFormattedDates( data ) );

    // Update the dropdown in experience form:
    $( ".js-xp-dropdown" ).find( "option[data-val=" + data._key + "]" ).text( $.tmpl( "dropdown-option-xp", data ).text() );
});
firebaseDb.ref( "experiences" ).on( "child_removed", function( data ) {
    // Add the category in the list:
    changeUI( ".js-experiences", "experience" ).removeItem( data.val() );

    // Remove the dropdown option:
    var _data = data.val();
    $( ".js-xp-dropdown" ).find( "option[data-val=" + _data._key + "]" ).remove();
});


// Shots:
firebaseDb.ref( "shots" ).on( "child_added", function( data ) {
    // Update the dropdown in experience form:
    var _data = data.val();
    var _html = $.tmpl( "dropdown-option-shot", getObjectWithFormattedDates( _data ) );
    $( ".js-shots-dropdown" ).append( _html );
});