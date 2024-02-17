DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pdfs;

CREATE TABLE users (
    user_id SERIAL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE pdfs(
    pdf_id SERIAL,
    user_id INT,
    pdf_data TEXT,
    created_at DATE,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE
);