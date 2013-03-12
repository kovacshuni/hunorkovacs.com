package com.hunorkovacs.whoami;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static com.sun.corba.se.impl.naming.cosnaming.TransientNameServer.trace;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

@WebAppConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class DefaultControllerIT {

    @Resource
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testBlankGetRedirectsToFirstPage() throws Exception {
        mockMvc.perform(get("/").accept(MediaType.TEXT_HTML))
                .andExpect(status().isMovedTemporarily())
                .andExpect(redirectedUrl("/static/hard-to-remember.html"));
    }

    @Test
    public void testAnyUrlGetRedirectsToFirstPage() throws Exception {
        mockMvc.perform(get("/1/a/2/b/3/c/4d/5e/6f/anything").accept(MediaType.TEXT_HTML))
                .andExpect(status().isMovedTemporarily())
                .andExpect(redirectedUrl("/static/hard-to-remember.html"));
    }

    @Test
    public void testPostNotAllowed() throws Exception {
        mockMvc.perform(post("/")).andExpect(status().isMethodNotAllowed());
    }

    @Test
    public void testPutNotAllowed() throws Exception {
        mockMvc.perform(put("/")).andExpect(status().isMethodNotAllowed());
    }

    @Test
    public void testDeleteNotAllowed() throws Exception {
        mockMvc.perform(delete("/")).andExpect(status().isMethodNotAllowed());
    }
}
