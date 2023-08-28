package org.techvestor.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BaseController {

    @Autowired
    private RestTemplate restTemplate;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView welcome() {
        return new ModelAndView("/resources/index.html");
    }
}
