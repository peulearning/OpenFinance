package com.financeapp.backend.dto;

import com.financeapp.backend.model.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDate;

public class TransactionDTO {

    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private LocalDate date;
    private String userEmail; // Temporário: para sabermos de quem é a conta

    public TransactionDTO() {}

    // --- GETTERS E SETTERS ---

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}