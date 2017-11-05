var _markup = "<option value='${ _key }' data-val='${ _key }'>${ xpName } by @${ owner.split( '@' )[ 1 ] }</option>";


// Register this template:
$.template( "dropdown-option-xp", _markup );