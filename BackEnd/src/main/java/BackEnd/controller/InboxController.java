package BackEnd.controller;

import BackEnd.DTO.InboxDTO;
import BackEnd.entity.Inbox;
import BackEnd.service.InboxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/inbox")
public class InboxController {

    private final InboxService inboxService;

    @Autowired
    public InboxController(InboxService inboxService) {
        this.inboxService = inboxService;
    }

    @GetMapping("/{username}")
    public List<InboxDTO> getInboxByUsername(@PathVariable("username") String username) {
        return inboxService.getAllInboxMessagesByUser(username);
    }

    @PostMapping
    public InboxDTO saveInboxMessage(@RequestBody Inbox inbox) {
        return inboxService.saveInboxMessage(inbox);
    }

    @PostMapping("/{conversationId}/{username}")
    public ResponseEntity<InboxDTO> saveInboxMessageByConversationId(@PathVariable Long conversationId, @PathVariable String username, @RequestBody Inbox inbox) {
        InboxDTO inboxDTO = inboxService.saveInboxMessageByConversationId(conversationId, username, inbox);
        if (inboxDTO != null) {
            return new ResponseEntity<>(inboxDTO, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/changeIsRead/{conversationId}")
    public ResponseEntity<InboxDTO> changeIsRead(@PathVariable Long conversationId) {
        InboxDTO updatedInbox = inboxService.changeIsRead(conversationId);
        return updatedInbox != null ? ResponseEntity.ok(updatedInbox) : ResponseEntity.notFound().build();
    }
}