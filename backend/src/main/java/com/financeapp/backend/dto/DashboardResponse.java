package com.financeapp.backend.dto;

import java.math.BigDecimal;

public class DashboardResponse {
    private BigDecimal totalBalance; // Saldo (Entradas - Saídas)
    private BigDecimal totalIncome;  // Só Entradas
    private BigDecimal totalExpense; // Só Saídas

    public DashboardResponse(BigDecimal totalBalance, BigDecimal totalIncome, BigDecimal totalExpense) {
        this.totalBalance = totalBalance;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
    }

    // Getters e Setters
    public BigDecimal getTotalBalance() { return totalBalance; }
    public void setTotalBalance(BigDecimal totalBalance) { this.totalBalance = totalBalance; }
    public BigDecimal getTotalIncome() { return totalIncome; }
    public void setTotalIncome(BigDecimal totalIncome) { this.totalIncome = totalIncome; }
    public BigDecimal getTotalExpense() { return totalExpense; }
    public void setTotalExpense(BigDecimal totalExpense) { this.totalExpense = totalExpense; }
}