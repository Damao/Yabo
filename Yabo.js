/*
 Yabo (鸭脖)
 @author BigCat
 Intellij IDEA / PHPStorm / WebStrom
 Settings > External Tools >
 {
 "Program":"wscript.exe",
 "Parameters":"E:\Dropbox\Code\Yabo\Yabo.js E:\Dropbox\Code\yuicompressor-master\build\yuicompressor-2.4.8pre.jar $FilePath$ $FileNameWithoutExtension$.min.$FileExt$ $FileName$",
 "Working directory":"$FileDir$"
 }

 replace combo.js & yuicompressor-VARpre.jar with your path;
 */

var fso = new ActiveXObject("Scripting.FileSystemObject");
var WshShell = WScript.CreateObject("WScript.Shell");
var oShell = WScript.CreateObject("WScript.Shell");
var ForReading = 1, ForWriting = 2;
var strAbsPath = WScript.ScriptFullName;
var strCombo = "";

var args = WScript.Arguments;
if (args.Count() == 0) {
    WScript.Echo("Usage: Read source or Find bigCat");
    WScript.Quit();
}

var strYUIPath = args(0);
var strFilePath = args(1);
var strMinFile = args(2);
var strFileName = args(3);

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

var fileSourceContent = getFileContent(strFilePath);
var arrayImportFileList = fileSourceContent.match(/@import url\("?.*?\.css"?\)/g);
if (arrayImportFileList != null) {
    for (var i = 0; i < arrayImportFileList.length; i++) {
        arrayImportFileList[i] = arrayImportFileList[i].replace(/@import url\("?(.*?\.css)"?\)/g, "$1");
        strCombo += getFileContent(arrayImportFileList[i]);
    }
}

strCombo += fileSourceContent.replace(/@import.*?;/g, "");

strOpenTextFile = fso.CreateTextFile(strFilePath + '.css', true);
strOpenTextFile.WriteLine(strCombo);
strOpenTextFile.Close();

oShell.Run("java -jar " + strYUIPath + " -o " + strMinFile + " " + strFileName + '.css', 1 /* SW_SHOWNORMAL */, true /* bWaitOnReturn */);

fso.DeleteFile(strFilePath + '.css');