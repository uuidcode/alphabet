package com.github.uuidcode.alphabet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class Resource {
    public static final String ROOT_DIR = "./src/main/webapp";
    public static final String IMAGE_DIR = ROOT_DIR + "/images";
    public static final File MP3_DIR = new File(ROOT_DIR, "mp3");
    public static final File DATA_JS_FILE = new File(ROOT_DIR, "js/data.js");

    public static void main(String[] args) throws Exception {

        String word = "friend".toUpperCase();
        String imageUrl = "";

        downloadMp3(word);
        downloadAndConvertImage(word, imageUrl);
        addWord(word);
    }

    private static void addWord(String word) throws IOException {
        String content = "wordList.push('" + word + "');\n";
        FileUtils.write(DATA_JS_FILE, content, true);
    }

    private static void convertImage(String word, File downloadFile) throws IOException {
        File wordImageFile = new File(IMAGE_DIR, word + ".png");

        if (downloadFile.getName().endsWith("png")) {
            downloadFile.renameTo(wordImageFile);
        } else {
            Runtime.getRuntime().exec(new String[] {"convert", downloadFile.getCanonicalPath(), wordImageFile.getCanonicalPath()});
            downloadFile.delete();
        }

        Runtime.getRuntime().exec(new String[] {"convert", wordImageFile.getCanonicalPath(), "-resize", "350x350", wordImageFile.getCanonicalPath()});
    }

    private static void downloadMp3(String word) throws Exception {
        Document document = Jsoup.connect("http://dic.daum.net/search.do?q=" + word).get();
        String url = document.select("a.btn_once").get(0).attr("href");
        download(url + "?download", new File(MP3_DIR,  word + ".mp3"));
    }

    public static void downloadAndConvertImage(String word, String url) throws Exception {
        String[] item = url.split("/");
        String fileName = item[item.length - 1];

        String[] fileItem = fileName.split("\\.");
        String ext = fileItem[fileItem.length - 1];
        File downloadFile = new File(IMAGE_DIR, String.valueOf(System.currentTimeMillis()) + "." + ext);

        download(url, downloadFile);
        convertImage(word, downloadFile);
    }

    public static void download(String url, File file) throws Exception {
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            InputStream in = entity.getContent();
            FileOutputStream out = new FileOutputStream(file);
            IOUtils.copy(in, out);
        }
    }
}
