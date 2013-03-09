package com.hunorkovacs.whoami;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.view.RedirectView;

@Controller
@RequestMapping("/")
public class DefaultController {

    @RequestMapping(value = "/**", method = RequestMethod.GET)
    public RedirectView get() {
        return new RedirectView("/hard-to-remember.html");
    }
}
