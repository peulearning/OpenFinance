package com.financeapp.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.financeapp.backend.dto.DashboardResponse;
import com.financeapp.backend.dto.TransactionDTO;
import com.financeapp.backend.model.Transaction;
import com.financeapp.backend.model.TransactionType;
import com.financeapp.backend.model.User;
import com.financeapp.backend.repository.TransactionRepository;
import com.financeapp.backend.repository.UserRepository;

@Service
public class TransactionService {

  private final TransactionRepository transactionRepository;
  private final UserRepository userRepository;

  public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
  }

  public Transaction create(TransactionDTO dto) {
        // 1. Achar o dono da conta
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("Utilizador não encontrado: " + dto.getUserEmail()));

        // 2. Criar a transação
        Transaction transaction = new Transaction();
        transaction.setDescription(dto.getDescription());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setDate(dto.getDate());
        transaction.setUser(user);

        // 3. Salvar no banco
        return transactionRepository.save(transaction);
    }


    public List<Transaction> listByEmail(String email) {
        return transactionRepository.findAllByUserEmail(email);
    }


    // Adicionando para Calculcar Gastos
    public DashboardResponse getDashboardResponse(String email){
      List<Transaction> transactions = transactionRepository.findAllByUserEmail(email);

      BigDecimal income = transactions.stream()
          .filter(t -> t.getType() == TransactionType.INCOME)
          .map(Transaction::getAmount)
          .reduce(BigDecimal.ZERO, BigDecimal::add);

      BigDecimal expense = transactions.stream()
          .filter(t -> t.getType() == TransactionType.EXPENSE)
          .map(Transaction::getAmount)
          .reduce(BigDecimal.ZERO, BigDecimal::add);

      BigDecimal balance = income.subtract(expense);

      return new DashboardResponse(balance, income, expense);
    }

}
