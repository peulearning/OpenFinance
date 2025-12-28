package com.financeapp.backend.controller;

import com.financeapp.backend.dto.TransactionDTO;
import com.financeapp.backend.model.Transaction;
import com.financeapp.backend.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    // Criar uma nova despesa ou receita
    @PostMapping
    public ResponseEntity<Transaction> create(@RequestBody TransactionDTO dto) {
        Transaction t = service.create(dto);
        return ResponseEntity.ok(t);
    }

    // Listar todas as transações de um email
    // Exemplo de uso: GET /api/transactions?email=admin@email.com
    @GetMapping
    public ResponseEntity<List<Transaction>> list(@RequestParam String email) {
        return ResponseEntity.ok(service.listByEmail(email));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardData(@RequestParam String email) {
        return ResponseEntity.ok(service.getDashboardResponse(email));
    }
}