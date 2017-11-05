firebaseDb.ref( "users" ).on( "child_added", function( data ) {
    var _html = $.tmpl( "user", data.val() );
    $( ".js-users" ).append( _html );
});

firebaseDb.ref( "categories" ).on( "child_added", function( data ) {
    var _html = $.tmpl( "category", data.val() );
    $( ".js-categories" ).append( _html );
});

firebaseDb.ref( "experiences" ).on( "child_added", function( data ) {
    var _html = $.tmpl( "xp", data.val() );
    $( ".js-experiences" ).append( _html );
});

