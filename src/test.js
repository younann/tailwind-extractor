const glob = require( 'glob' );

// Test pattern that matches any js file in the current directory
const pattern = "./*.js";

console.log( "Starting glob test..." );

glob( pattern, ( err, files ) =>
{
    if ( err )
    {
        console.error( "Error using glob:", err );
        return;
    }

    console.log( "Files found:", files );
} );
