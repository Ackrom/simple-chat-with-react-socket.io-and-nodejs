const fs = require('fs');

class Message{
    
    constructor(){
        this.fileDir;
    }
    setFileDir(dir){
        this.fileDir = dir;
    }
    _allDone(){
        if(!this.fileDir){
            console.error("================\n","Sin dirección de archivo","\n======================\n");
            return false
        }
        return true;
    }
    getMsjs(){
        if(!this._allDone())
            return;
        
        let output = [];
        let data = fs.readFileSync(this.fileDir,'utf8');
        for (const value of data.split('\n')) {
            try {
                output.push(JSON.parse(value));
            } catch (error) {
                console.log(error.Message);
            }
        }
        return output;
    }
    addMsj(msj){
        fs.appendFileSync(this.fileDir,msj+'\n');
    }
}

module.exports = new Message();