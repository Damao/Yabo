Yabo
====

鸭脖 ( CSS 压缩 &amp;&amp; Combo )

###Version
* 13.2.4 @import url 支持 " ' 和空
* 12.11.20 集成 YUI compressor|修正中文编码问题
* 12.11.19 增加图片时间戳开关

###前世今生
[Ycombo](https://github.com/nqdeng/YCombo) 可以合并 CSS / JavaScript 并且基于 [YUI Compressor](https://github.com/yui/yuicompressor) 压缩

但必须要有一个合并列表文件,称之为 seed. 并且不方便无服务器端的本地开发.

所以 Yabo 应运而生

###功能点
* 无需单独的合并列表文件,直接读取 CSS 里的 @import 文件合并
* 合并后自动调用 YUI Compressor 进行压缩,filename.source.css 进去 出来 filename.css || filename.css 进去 出来 filename.min.css
* 给图片加时间戳, 包含关键词 Yabo_img_timestamp_off 来关闭此功能
* 给文件结尾加时间戳


###安装
1. 下载 [Yabo](https://github.com/damao/Yabo/downloads)
2. 编辑器里配置外部工具,这里用 [Intellij IDEA](https://github.com/damao/Intellij-IDEA-F2E) 举例,当然同样适用于 PHPStorm 和其他支持传参的编辑器

例如
	Settings > External Tools

	"Program":"wscript",
	"Parameters":"E:\Dropbox\Code\Yabo\JScript\Yabo.js $FilePath$",
	"Working directory":"$FileDir$"

要改的就是 Yabo.js 的路径,

$FilePath$ $FileDir$ 都是编辑器自动生成

对应 E:\source\source.css E:\source

###使用
在需要压缩的 CSS 文件内右键选择 Yabo.js

就会在同目录下生成当前文件.min.css

[图文教程演示](http://ooxx.me/yabo.orz)

###运行环境
目前是 JScript 写的,只能运行在 windows 下


###JAR版

JAR 需要 JAVA 环境支持，请确保已经安装好JDK，在命令行中可以正常运行  java -version

参数说明：

    -h --help 显示帮助
    -f --file CSS文件，允许绝对路径或JAR包的相对路径。压缩后以 文件名.min.css 保存

在命令行中运行，例：

    java -jar yabo-1.0.jar style.css

IDEA中的配置

    "Program":"$JDKPath$\bin\java.exe",
    "Parameters":"-jar yabo-1.0.jar -f $FilePath$",
    "Working directory":"E:\dropbox\code\Yabo\java\build\"

目前 jar 版与 JScript 在细节处理上还有一些差别，以后会保持一致。

###todo
* 目录遍历压缩功能还木实现
* 不支持JS合并(貌似也没好办法搞)


* * *
##EditPlus 相关设置

###部署Yabo脚本
 + 下载 [Yabo](https://github.com/damao/Yabo/downloads)
 + 把JScript目录下的两个文件拷贝到你的硬盘(比如d:/Yabo/)  


###编辑器里配置外部工具
    菜单选项：  
    Tools > Preferences > Tools > User tools > add Tool

    参数设置：  
    Menu text : Yabo  
    Command ： WScript.exe  
    Argument : d:/Yabo/Yabo.js $(FilePath)  
    Initial directory : $(FileDir)  
  
* Argument参数的文件路径为你存放Yabo.js的路径，Yabo.js和yuicompressor-2.4.8pre.jar这两个文件需要放在同一目录  
* Initial directory参数需要设置为$(FileDir)  
* $FilePath$ $FileDir$ 可以通过编辑器选项自动生成  

![EditPlus相关设置](http://seektan.github.com/img/yabo-editplus.png)


###使用
1. 快捷键(默认ctrl+数字，Yabo是你的第N个工具数字即为N，可keyboard菜单选项中修改)
2. 直接点击菜单tools中的定义好的Yabo

![EditPlus相关设置](http://seektan.github.com/img/yabo-editplus-go.png)