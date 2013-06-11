package com.hunorkovacs.whoami;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class DefaultController {

    @RequestMapping(value = "/**", method = RequestMethod.GET)
    public View get() {
        return new RedirectView("/Who-Am-I-comics/1-hard-to-remember.html");
    }
}
