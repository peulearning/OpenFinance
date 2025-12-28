CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    description VARCHAR(255),
    amount NUMERIC(19, 2),
    type VARCHAR(50),
    date DATE,
    user_id BIGINT NOT NULL,

    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
      REFERENCES users(id) -- Verifique se sua tabela de usuários chama 'users' ou '_user'
      ON DELETE CASCADE
);