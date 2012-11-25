/*
 Yabo (鸭脖) Version 12.11.20
 @author BigCat
 Intellij IDEA / PHPStorm / WebStrom
 Settings > External Tools >
 {
 "Program":"wscript.exe",
 "Parameters":"E:\Dropbox\Code\Yabo\Yabo.js $FilePath$ $FileName$",
 "Working directory":"$FileDir$"
 }

 replace "E:\Dropbox\Code\Yabo\Yabo.js" with your Yabo path;

 special vars:

 */

var regex_timestamp = /\.(png|jpg)/g; /*定义需要加时间戳的图片后缀*/
var Yabo_img_timestamp = true;/*默认全局图片加时间戳*/
// css文件里如果有 Yabo_img_timestamp_off 关键词,就会针对性关闭




//上面随便玩
//下面不是给你吃的


var fso = new ActiveXObject("Scripting.FileSystemObject");
var WshShell = WScript.CreateObject("WScript.Shell");
var oShell = WScript.CreateObject("WScript.Shell");
var ForReading = 1, ForWriting = 2;
var strScriptPath = WScript.ScriptFullName;
var strScriptName = WScript.ScriptName;
var timestamp = new Date();

var strGetScriptPath = strScriptPath.replace(strScriptName, "");
var strYUIPath = strGetScriptPath+'yuicompressor-2.4.8pre.jar';

var strCombo = "";

var args = WScript.Arguments;
if (args.Count() == 0) {
    WScript.Echo("Usage: Read source or Find bigCat");
    WScript.Quit();
}

var strFilePath = args(0);
var strFileName = strFilePath.match(/[^\\]*\.css$/)[0];
if(strFileName.match(/\.source/)){
    strFileName = strFileName.replace(".source","");
}else{
    strFileName = strFileName.replace(".css",".min.css");
}


function getFileContent(path) {
    if (!fso.FileExists(path)) {
        WScript.Echo(path + " 404");
        WScript.Quit(404);
    } else {
        var file = fso.OpenTextFile(path, ForReading);
        if (!file.AtEndOfStream) {
            strFileContent = file.ReadAll();
        }
        file.Close();
        return strFileContent;
    }
}

timestamp = timestamp.getFullYear().toString() + (timestamp.getMonth() + 1) + timestamp.getDate() + timestamp.getHours() + timestamp.getMinutes() + timestamp.getSeconds();
var yabo_timestamp = '#Yabo{transform:rotate(' + timestamp + 'deg)}'; //文件最后的时间戳

var fileSourceContent = getFileContent(strFilePath);
fileSourceContent = fileSourceContent.replace(/\r\s/g, ""); //搞成一行好办事
fileSourceContent = fileSourceContent.replace(/\/\*.*?[\*\?]\//g, ""); //去掉注释先,避免注释里有 @import
//诡异去注释正则的故事,因为以ASCII读取的时候,中文后面跟着菊花*,会变成问号,例如 /*中文*/ 就会变成 /*中�?/

var arrayImportFileList = fileSourceContent.match(/@import url\("?.*?\.css"?\)/g);

if (arrayImportFileList != null) {
    for (var i = 0; i < arrayImportFileList.length; i++) {
        arrayImportFileList[i] = arrayImportFileList[i].replace(/@import url\("?(.*?\.css)"?\)/g, "$1"); //干掉import语句
        strCombo += getFileContent(arrayImportFileList[i]);
    }
}

strCombo += fileSourceContent.replace(/@import.*?;/g, "");
WScript.Echo(Yabo_img_timestamp);
if(fileSourceContent.match(/Yabo_img_timestamp_off/g)){
    Yabo_img_timestamp=false;
}
WScript.Echo(Yabo_img_timestamp);
if(Yabo_img_timestamp){
    strCombo = strCombo.replace(regex_timestamp, ".$1?" + timestamp);
}

strCombo += yabo_timestamp;
strCombo=strCombo.replace(/\r\s/g, ""); //搞成一行好办事
strCombo=strCombo.replace(/\/\*.*?[\*\?]\//g, ""); //干掉非正常注释

strOpenTextFile = fso.CreateTextFile(strFilePath + '.css', true);
strOpenTextFile.WriteLine(strCombo);
strOpenTextFile.Close();

oShell.Run("java -jar " + strYUIPath + " -o " + strFileName + " " + strFilePath + '.css', 1 /* SW_SHOWNORMAL */, true /* bWaitOnReturn */);

fso.DeleteFile(strFilePath + '.css');