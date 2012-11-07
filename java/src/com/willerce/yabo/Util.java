package com.willerce.yabo;

import java.io.*;

/**
 * Created with IntelliJ IDEA.
 * User: willerce
 * Date: 11/6/12
 * Time: 8:47 PM
 */
public class Util {

    //从文件里读取数据.
    public static String readToString(String path, String encoding) {
        File file = new File(path);// 指定要读取的文件
        Long filelength = file.length();
        byte[] filecontent = new byte[filelength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return new String(filecontent, encoding);
        } catch (UnsupportedEncodingException e) {
            System.err.println("The OS does not support " + encoding);
            e.printStackTrace();
            return null;
        }
    }

    //往文件里写入数据.
    public static void writeToFile(String writerContent, String path) throws IOException {
        File file = new File(path);// 要写入的文本文件
        if (!file.exists()) {// 如果文件不存在，则创建该文件
            file.createNewFile();
        }
        FileWriter writer = new FileWriter(file);// 获取该文件的输出流
        writer.write(writerContent);// 写内容
        writer.flush();// 清空缓冲区，立即将输出流里的内容写到文件里
        writer.close();// 关闭输出流，施放资源
    }

    public static boolean deleteFile(String path){
        File file = new File(path);
        if(file.isFile() && file.exists()){
            file.delete();
            return true;
        }else{
            return false;
        }
    }

    //Return the extension portion of the file's name .
    public static String getExtension(File f) {
        return (f != null) ? getExtension(f.getName()) : "";
    }

    public static String getExtension(String filename) {
        return getExtension(filename, "");
    }

    public static String getExtension(String filename, String defExt) {
        if ((filename != null) && (filename.length() > 0)) {
            int i = filename.lastIndexOf('.');

            if ((i > -1) && (i < (filename.length() - 1))) {
                return filename.substring(i + 1);
            }
        }
        return defExt;
    }

    public static String trimExtension(String filename) {
        if ((filename != null) && (filename.length() > 0)) {
            int i = filename.lastIndexOf('.');
            if ((i > -1) && (i < (filename.length()))) {
                return filename.substring(0, i);
            }
        }
        return filename;
    }
}
