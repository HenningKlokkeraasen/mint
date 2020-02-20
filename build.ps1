./node_modules/.bin/babel src --out-file www/js/site.js --no-comments
Write-Output "    * Babel: Compiled all files in 'src' to 'www/js/site.js'"

Get-ChildItem -Path "src\hbs-templates" | ForEach-Object {
    $currentFilePath = $_.FullName
    $newName = $_.Name -replace ".handlebars", ".precompiled.js"
    $newPath = "www\js\hbs-compiled\${newName}"
    ./node_modules/.bin/handlebars $currentFilePath -f $newPath
    Write-Output "    * Handlebars: Ran precompile for ${currentFilePath} to ${newPath}"
}

Copy-Item "node_modules\handlebars\dist\handlebars.min.js"  -Destination "www\js"
Write-Output "    * Copied handlebars.js to /www/js"