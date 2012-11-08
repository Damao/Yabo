Yabo
====

鸭脖(压缩 &amp;&amp; Combo )

###前世今生
[Ycombo](https://github.com/nqdeng/YCombo) 可以合并 CSS / JavaScript 并且基于 [YUI Compressor](https://github.com/yui/yuicompressor) 压缩

但必须要有一个合并列表文件,称之为 seed. 并且不方便无服务器端的本地开发.

所以 Yabo 应运而生

###功能点
* 无需单独的合并列表文件,直接读取 CSS 里的 @import 文件合并
* 合并后自动调用 YUI Compressor 进行压缩,生成 文件名.min.css

###安装
1. 下载 [YUI Compressor](https://github.com/yui/yuicompressor)
2. 下载 [Yabo](https://github.com/damao/Yabo/downloads)
3. 编辑器里配置外部工具,这里用 [Intellij IDEA](https://github.com/damao/Intellij-IDEA-F2E) 举例,当然同样适用于 PHPStorm 和其他支持传参的编辑器

例如
	Settings > External Tools

	"Program":"wscript.exe",
	"Parameters":"E:\Dropbox\Code\Yabo\Yabo.js E:\Dropbox\Code\yuicompressor-master\build\yuicompressor-2.4.8pre.jar $FilePath$ $FileNameWithoutExtension$.min.$FileExt$ $FileName$",
	"Working directory":"$FileDir$"

要改的就是 Yabo.js 和 yuicompressor.jar 的路径

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

目前 jar 版与 jscript 在细节处理上还有一些差别，以后会保持一致。

###todo
目录遍历压缩功能还木实现