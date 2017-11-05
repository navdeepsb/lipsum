var userAddedFn = function( data ) {
    var _html = $.tmpl( "user", data.val() );
    $( ".js-users" ).append( _html );
};

var userUpdatedFn = function( data ) {
    var data  = data.val();
    var _html = $.tmpl( "user", data );

    $( ".js-users" ).find( "[data-key=" + data._key + "]" ).parent( "li" ).html( _html );
};

var userRemovedFn = function( data ) {
    $( ".js-users" ).find( "[data-key=" + data.val()._key + "]" ).parent().remove();
};


firebaseDb.ref( "users" ).on( "child_added", userAddedFn );
firebaseDb.ref( "users" ).on( "child_changed", userUpdatedFn );
firebaseDb.ref( "users" ).on( "child_removed", userRemovedFn );










// old upsert():
// If id doesn't exist, create one by pushing an empty object to the model store:
data._key = data._key || window.firebaseDb.ref( modelStore ).push().key;

// Id was present in `data`, proceed to modify this model:
window.firebaseDb.ref( modelStore + "/" + data._key ).update( data );
// NOTE: `update()` replaces the child at the node specified by the ref

return data;
// NOTE: `set()` overwrites data at that node, all of it!
