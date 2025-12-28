package com.financeapp.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transactions")
public class Transaction {


  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;


  private String description;

  private BigDecimal amount; // Dinheiro

  @Enumerated(EnumType.STRING)
  private TransactionType type; // Receita ou Despesa

  private LocalDate date;


  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;


  public Transaction(){}


  // Getter & Setter

  public Long getId(){
    return id;
  }

  public void setId(Long id){
    this.id = id;
  }

  public String getDesription(){
    return description;
  }

  public void setDescription(String description){
    this.description = description;
  }

  public BigDecimal getAmount(){
    return amount;
  }

  public void setAmount(BigDecimal amount){
    this.amount = amount;
  }

  public TransactionType getType(){
    return type;
  }

  public void setType(TransactionType type){
    this.type = type;
  }

  public LocalDate getDate(){
    return date;
  }

  public void setDate(LocalDate date){
    this.date = date;
  }

  public User getUser(){
    return user;
  }

  public void setUser(User user){
    this.user = user;
  }
  

}
