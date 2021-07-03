package org.techvestor.controllers;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.techvestor.models.TopHeadlines;

@RestController
public class TopRestController {
    @Autowired
    private RestTemplate restTemplate;

    @CrossOrigin(origins = "http://localhost:8080")
    @RequestMapping(value="/top-headlines", method =  RequestMethod.GET)
    public TopHeadlines topHeadlines(@RequestParam String newsTopic) {
        Gson gson = new Gson();
        String response = restTemplate
                .getForObject("https://gnews.io/api/v4/top-headlines?token=a0a30dd5d88ce253266642a7ee0c0fe2&lang=en&country=in&topic="+newsTopic, String.class);
        TopHeadlines headlines = gson.fromJson(response, TopHeadlines.class);
        System.out.println(response);
        return headlines;
    }
}
