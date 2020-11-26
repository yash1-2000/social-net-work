function Duri (file){
    const data = file.buffer.toString('base64')
    const uri = 'data:' + file.mimetype + ';' + 'base64' + ',' + data;
    return uri
}

module.exports = Duri