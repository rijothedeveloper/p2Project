package com.revature.services;


import com.revature.daos.ReplyDAO;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {

    ReplyDAO replyDAO;

    public ReplyService(ReplyDAO replyDAO) {
        this.replyDAO = replyDAO;
    }
}
