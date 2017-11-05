var _markup = "<option value='${ _key }' data-val='${ _key }'>${ caption } by @${ owner.split( '@' )[ 1 ] } in ${ parentXp }</option>";


// Register this template:
$.template( "dropdown-option-shot", _markup );