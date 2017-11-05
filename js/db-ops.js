window.DB = {
    upsert: function( modelStore, data, callback ) {
        return window.firebaseDb.ref( modelStore ).once( "value" )
            .then( function( snapshot ) {
                try {
                    var childRef   = snapshot.child( data._key || "-empty-" );
                    var oldData    = childRef.val(); // will be `null` if not found
                    var isUpdateOp = childRef.exists();

                    data._key = isUpdateOp ? data._key : window.firebaseDb.ref( modelStore ).push().key;

                    window.firebaseDb.ref( modelStore + "/" + data._key ).update( data );

                    return {
                        newData: data,
                        oldData: oldData,
                        isUpdateOp: isUpdateOp
                    };
                }
                catch( ex ) {
                    console.error( "Error occurred!", ex.stack );
                }
            });
    },

    nestedChildUpsert: function( modelStore, data, callback ) {
        // experiences/guid/shots
        return window.firebaseDb.ref( modelStore ).once( data._key || "-empty-" )
            .then( function( snapshot ) {
                try {
                    var childRef   = snapshot.child( snapshot._key || "-empty-" );
                    var oldData    = childRef.val(); // will be `null` if not found
                    var isUpdateOp = childRef.exists();

                    data._key = isUpdateOp ? data._key : window.firebaseDb.ref( modelStore ).push().key;

                    window.firebaseDb.ref( modelStore + "/" + data._key ).update( data );

                    return {
                        newData: data,
                        oldData: oldData,
                        isUpdateOp: isUpdateOp
                    };
                }
                catch( ex ) {
                    console.error( "Error occurred!", ex.stack );
                }
            });
    },

    remove: function( modelStore, _key ) {
        try {
            if( _key ) {
                window.firebaseDb.ref( modelStore + "/" + _key ).remove();
            }
        }
        catch( ex ) {
            console.error( "Error occurred!", ex.stack );
        }
    },

    updateNumericVal: function( keyLoc, isIncr, callback ) {
        try {
            window.firebaseDb.ref( keyLoc ).once( "value", function( response ) {
                var currVal = response.val();
                var _update = {};
                _update[ keyLoc ] = isIncr ? ++currVal : -- currVal;
                window.firebaseDb.ref().update( _update );

                if( callback && typeof callback === "function" ) {
                    callback();
                }
            });
        }
        catch( ex ) {
            console.error( "Error occurred!", ex.stack );
        }
    },

    getAll: function( modelStore ) {},

    getOne: function( modelStore, _key ) {}
};