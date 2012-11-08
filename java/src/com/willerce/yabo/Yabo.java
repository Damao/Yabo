package com.willerce.yabo;

import jargs.gnu.CmdLineParser;
import java.io.*;
import com.yahoo.platform.yui.compressor.YUICompressor;

/**
 * Created with IntelliJ IDEA.
 * User: willerce
 * Date: 11/6/12
 * Time: 8:40 PM
 */
public class Yabo {
    public static void main(String args[]) {

        CmdLineParser parser = new CmdLineParser();
        CmdLineParser.Option fileOpt = parser.addStringOption('f', "file");
        CmdLineParser.Option helpOpt = parser.addBooleanOption('h', "help");
        CmdLineParser.Option versionOpt = parser.addBooleanOption('V', "version");

        try {
            parser.parse(args);

            //输出帮助
            Boolean help = (Boolean) parser.getOptionValue(helpOpt);
            if (help != null && help.booleanValue()) {
                usage();
                System.exit(0);
            }

            //输出版本号信息
            Boolean version = (Boolean) parser.getOptionValue(versionOpt);
            if (version != null && version.booleanValue()) {
                version();
                System.exit(0);
            }

            //根目录
            String rootPath;

            //原CSS文件路径
            String filePath = (String) parser.getOptionValue(fileOpt);

            //需要合并压缩的文件
            File file = new File(filePath);

            //如果给的不是绝对路径,则以当前jar包所有路径为根目录
            if(!file.isAbsolute()){
                rootPath = System.getProperty("user.dir", "w:\\")+"\\";
            }else{
                rootPath = file.getParent()+"\\";
            }

            //设置压缩合并后的保存路径，根目录/文件名.min.css
            String outputPath = rootPath + Util.trimExtension(file.getName()) +".min.css";

            //判断文件后缀
            if (!"css".equals(Util.getExtension(file))) {
                System.out.println("抱歉，暂时只支持单个CSS合并压缩");
                return;
            } else {

                StringBuffer sb = new StringBuffer();
                FileReader reader = new FileReader(filePath);
                BufferedReader br = new BufferedReader(reader);
                String line;
                while ((line = br.readLine()) != null) {
                    if (line.matches("@import url\\(\"?(.*?\\.css)\"?\\);?")) {//是一个import
                        String importCssPath = line.replaceFirst("@import url\\(\"?(.*?\\.css)\"?\\);?", "$1");
                        sb.append(Util.readToString(rootPath + "\\" + importCssPath, "utf-8"));
                    } else {
                        sb.append(line);
                    }
                }
                br.close();
                reader.close();

                //System.out.println(sb);

                //保存一个临时文件
                Util.writeToFile(sb.toString(), rootPath + "tmp_combo.css");

                String[] par = {"-o", outputPath, rootPath + "tmp_combo.css"};

                //运行YUI
                YUICompressor.main(par);

                //删除临时文件
                Util.deleteFile(rootPath + "tmp_combo.css");

                System.out.print("Yeah! yabo compressor sucess run");
            }
        } catch (Exception e) {
            System.out.print(e);
        }
    }

    private static void version() {
        System.err.println("1.0");
    }

    private static void usage() {
        System.err.println(
                "\nYabo Version: 1.0\n"
                + "Usage: java -jar yabo-1.0.jar -f [input file]\n"
                + "\n"
                + "Options\n"
                + "  -V, --version             Print version information\n"
                + "  -h, --help                Displays this information\n"
                + "  -f css file path          Input CSS file absolute path\n");
    }
}
