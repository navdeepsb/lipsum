/**
 * Models
 * ------
 * 1. User
 * 2. Experience
 * 3. Shot
 **/

var JSON_PARSE_INDICATOR_PREFIX    = "json$";
var NUMERIC_PARSE_INDICATOR_PREFIX = "num$";
var PARENT_INDICATOR_PREFIX        = "parent$";

var RELATIONAL = {
    categoriesUpdate: function( d ) {
        var newCat = $.tmpl( "db-category-str", d.newData ).text();
        var oldCat = $.tmpl( "db-category-str", d.oldData ).text();
        // Find all experiences of this category
        // and update each `experiences/guid/category/`
        window.firebaseDb.ref( "experiences" )
            .orderByChild( "category" ) // order
            .equalTo( oldCat ) // filter
            .once( "value", function( snapshot ){ // retrieve
                snapshot.forEach( function( datum ) { // iterate each
                    datum.ref.update({ "category": newCat });
                });
            });
    },
    usersUpdate: function( d ) {
        var newDbString = $.tmpl( "db-owner-str", d.newData ).text();
        var oldDbString = $.tmpl( "db-owner-str", d.oldData ).text();

        // Find all experiences of this category
        // and update each `experiences/guid/owner/`
        window.firebaseDb.ref( "experiences" )
            .orderByChild( "owner" ) // order
            .equalTo( oldDbString ) // filter
            .once( "value", function( snapshot ){ // retrieve
                snapshot.forEach( function( datum ) { // iterate each
                    datum.ref.update({ "owner": newDbString });
                });
            });
    }
};



$( ".js-submit-form" ).on( "click", function( e ) {
    e.preventDefault();

    var data             = {};
    var $button          = $( this );
    var modelStore       = $button.data( "model-store" );
    var relationalUpdt   = $button.data( "relational" );
    var typeOfUpdate     = $button.data( "type" );
    var isNestedChild    = $button.data( "nested-model" );
    var nestedChildLevel = $button.data( "nested-level" ) || 1;
    var $form            = $button.closest( "form" );
    var formData         = $form.serializeArray();

    // Add unchecked checkbox values to `formData` since they
    // are ignored by `serializeArray`:
    $form.find( "input[type=checkbox]:not(:checked)" ).each( function() {
        formData.push({
            "name"  : this.name,
            "value" : false
        });
    });

    formData.forEach( function( touple ) {
        var key = touple.name;
        var val = touple.value;

        if( key.startsWith( JSON_PARSE_INDICATOR_PREFIX ) ) {
            key = key.substr( JSON_PARSE_INDICATOR_PREFIX.length );
            val = JSON.parse( val == -1 ? null : val );
            // handles json values in the form field
        }

        if( key.startsWith( NUMERIC_PARSE_INDICATOR_PREFIX ) ) {
            key = key.substr( NUMERIC_PARSE_INDICATOR_PREFIX.length );
            val = window.parseInt( val, 10 );
            // handles numeric values in the form field
        }

        if( key.startsWith( PARENT_INDICATOR_PREFIX ) ) {
            key = key.substr( PARENT_INDICATOR_PREFIX.length );
            val = val.substr( val.indexOf( PARENT_INDICATOR_PREFIX ) + PARENT_INDICATOR_PREFIX.length );
            // handles parentId values in the form field
        }

        data[ key ] = val === "true" || val; // handles input fields, textareas and checkboxes
    });

    if( isNestedChild ) {
        // Modify the model store to get the absolute path of this child:

        if( nestedChildLevel === 1 )
            modelStore = $button.data( "parent-model" ) + "/" + data.parentId + "/" + modelStore;

        if( nestedChildLevel === 2 )
            modelStore = $button.data( "grandparent-model" ) + "/" + data.grandParentId + "/" + $button.data( "parent-model" ) + "/" + data.parentId + "/" + modelStore;

        // grandparent-model/guid/parent-model/guid/modelStore
    }

    console.log( "# [" + modelStore + "]:", data );
    // return;

    DB.upsert( modelStore, data ).then( function( oldAndNewData ) {
        // HANDLE RELATIONAL UPDATES:
        if( relationalUpdt && oldAndNewData.isUpdateOp ) {
            RELATIONAL[ relationalUpdt ]( oldAndNewData );
        }
    });


    // $form.find( "input" ).val( "" ); // clear input fields after submit
});

$( document ).on( "click", ".js-remove-model", function( e ) {
    e.preventDefault();

    var _key       = $( this ).data( "key" );
    var modelStore = $( this ).data( "model-store" );

    DB.remove( modelStore, _key );
});

$( document ).on( "click", ".js-update-numeric-val", function( e ) {
    e.preventDefault();

    var $this   = $( this );
    var keyPath = $this.data( "model-store" );
    var isIncr  = $this.data( "num-updt-type" ) == "incr";
    var cb = function() {
        $this.addClass( "hide" ).siblings( ".js-update-numeric-val" ).removeClass( "hide" );
    }

    DB.updateNumericVal( keyPath, isIncr );
    // DB.updateNumericVal( keyPath, isIncr, cb );
});

// $( ".todos li" ).on( "click", function( e ) {
//     $( this ).toggleClass( "done" );
// });

$( "#timegen" ).on( "click", function( e ) {
    e.preventDefault();
    $( this ).parent().find( ".res" ).text( "Long: " + Date.now() );
});