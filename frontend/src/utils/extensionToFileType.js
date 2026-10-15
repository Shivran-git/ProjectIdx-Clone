const extensionMapper = {
    'js' : 'javascript',
    'jsx' : 'javascript',
    'ts' : 'typescript',
    'tsx': 'tsx',
    'html' : 'html',
    'svg' : 'svg',
    'css' : 'css',
    'json' : 'json',
    'md' : 'markdown'

}

export const extensionToFileType = (extension)=>{
     if(!extension) return undefined ;
     return extensionMapper[extension] ;
}