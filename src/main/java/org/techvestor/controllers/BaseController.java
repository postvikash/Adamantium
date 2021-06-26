package org.techvestor.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BaseController {

    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public ModelAndView welcome() {
        System.out.println("Print");
        return new ModelAndView("/static/index.html");
    }

    @RequestMapping(value = "/shelcome", method = RequestMethod.GET)
    public ModelAndView shelcome() {
        return new ModelAndView("index.html");
    }
}
