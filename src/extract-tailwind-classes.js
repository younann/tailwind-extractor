const fs = require( 'fs' );
const path = require( 'path' );

const classNames = new Set();

function extractClassNames ( content )
{
    const classRegex = /class(Name)?=("|'|`)([^"`']+)("|'|`)/g;
    let match;
    while ( ( match = classRegex.exec( content ) ) )
    {
        match[ 3 ].split( /\s+/ ).forEach( className => classNames.add( className ) );
    }
}

function readFile ( filePath )
{
    fs.readFile( filePath, 'utf8', ( err, content ) =>
    {
        if ( err )
        {
            console.error( `Error reading file ${ filePath }:`, err );
            return;
        }
        extractClassNames( content );
    } );
}

function readDirectory ( directory )
{
    fs.readdir( directory, { withFileTypes: true }, ( err, items ) =>
    {
        if ( err )
        {
            console.error( `Error reading directory ${ directory }:`, err );
            return;
        }

        items.forEach( item =>
        {
            if ( item.isDirectory() )
            {
                readDirectory( path.join( directory, item.name ) );
            } else
            {
                // Define the file extensions you want to process
                if ( /\.(html|js|jsx|ts|tsx)$/.test( item.name ) )
                {
                    readFile( path.join( directory, item.name ) );
                }
            }
        } );
    } );
}

// Start reading from the test-files directory, adjust the path as necessary
readDirectory( path.join( __dirname, '../test-files' ) );

// Use a delay to wait for the asynchronous operations to complete
// In a real application, you would handle this with Promises or async/await
setTimeout( () =>
{
    console.log( "Extracted class names:", Array.from( classNames ) );
}, 3000 );
