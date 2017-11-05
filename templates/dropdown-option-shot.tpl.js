var _markup = "<option value='${ _key }' data-val='${ _key }'>${ parentXp } by @${ owner.split( '@' )[ 1 ] }, ${ createdOn }</option>";


// Register this template:
$.template( "dropdown-option-shot", _markup );