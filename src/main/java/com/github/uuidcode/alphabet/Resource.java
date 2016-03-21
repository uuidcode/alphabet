package com.github.uuidcode.alphabet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class Resource {
    public static void main(String[] args) throws Exception {

        String word = "friend";

        Document document = Jsoup.connect("http://dic.daum.net/search.do?q=" + word).get();
        String url = document.select("a.btn_once").get(0).attr("href");

        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url + "?download");
        HttpResponse response = httpClient.execute(httpGet);
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            InputStream is = entity.getContent();
            File mp3File = new File("./src/main/webapp/mp3/" + word.toUpperCase() + ".mp3");
            FileOutputStream fos = new FileOutputStream(mp3File);
            IOUtils.copy(is, fos);
        }
    }
}
