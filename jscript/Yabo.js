/*
 Yabo (鸭脖) Version 12.11.7
 @author BigCat
 Intellij IDEA / PHPStorm / WebStrom
 Settings > External Tools >
 {
 "Program":"wscript.exe",
 "Parameters":"E:\Dropbox\Code\Yabo\Yabo.js E:\Dropbox\Code\yuicompressor-master\build\yuicompressor-2.4.8pre.jar $FilePath$ $FileName$",
 "Working directory":"$FileDir$"
 }

 replace combo.js & yuicompressor-VARpre.jar with your path;
 */

var regex_timestamp = /\.(png|jpg)/g; /*定义需要加时间戳的图片后缀*/

var fso = new ActiveXObject("Scripting.FileSystemObject");
var WshShell = WScript.CreateObject("WScript.Shell");
var oShell = WScript.CreateObject("WScript.Shell");
var ForReading = 1, ForWriting = 2;
var strAbsPath = WScript.ScriptFullName;
var strCombo = "";
var timestamp = new Date();

var args = WScript.Arguments;
if (args.Count() == 0) {
    WScript.Echo("Usage: Read source or Find bigCat");
    WScript.Quit();
}

var strYUIPath = args(0);
var strFilePath = args(1);
var strFileName = args(2);
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
var arrayImportFileList = fileSourceContent.match(/@import url\("?.*?\.css"?\)/g);
if (arrayImportFileList != null) {
    for (var i = 0; i < arrayImportFileList.length; i++) {
        arrayImportFileList[i] = arrayImportFileList[i].replace(/@import url\("?(.*?\.css)"?\)/g, "$1");
        strCombo += getFileContent(arrayImportFileList[i]);
    }
}

strCombo += fileSourceContent.replace(/@import.*?;/g, "");
strCombo = strCombo.replace(regex_timestamp, ".$1?" + timestamp);
strCombo += yabo_timestamp;

strOpenTextFile = fso.CreateTextFile(strFilePath + '.css', true);
strOpenTextFile.WriteLine(strCombo);
strOpenTextFile.Close();

oShell.Run("java -jar " + strYUIPath + " -o " + strFileName + " " + strFilePath + '.css', 1 /* SW_SHOWNORMAL */, true /* bWaitOnReturn */);

fso.DeleteFile(strFilePath + '.css');