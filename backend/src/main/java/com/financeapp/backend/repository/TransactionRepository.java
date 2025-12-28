package com.financeapp.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.financeapp.backend.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {


  //Buscar Transação pelo Email da acc
  List<Transaction> findAllByUserEmail(String email);
}