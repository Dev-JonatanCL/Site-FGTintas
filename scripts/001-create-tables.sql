-- =============================================
-- FG Tintas - Criacao das tabelas MySQL
-- Execute no phpMyAdmin da Locaweb
-- =============================================

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de profissionais
CREATE TABLE IF NOT EXISTS professionals (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) DEFAULT '',
  whatsapp VARCHAR(30) DEFAULT '',
  specialty VARCHAR(255) DEFAULT '',
  description TEXT,
  city VARCHAR(100) DEFAULT '',
  state VARCHAR(2) DEFAULT '',
  photo TEXT,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  commission_balance DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabela de entradas de comissao
CREATE TABLE IF NOT EXISTS commission_entries (
  id VARCHAR(36) PRIMARY KEY,
  professional_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  purchase_value DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 1.00,
  commission_value DECIMAL(10,2) NOT NULL,
  added_by VARCHAR(100) DEFAULT 'Admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indices para performance
CREATE INDEX idx_professionals_email ON professionals(email);
CREATE INDEX idx_professionals_referral ON professionals(referral_code);
CREATE INDEX idx_professionals_active ON professionals(active);
CREATE INDEX idx_commission_professional ON commission_entries(professional_id);
CREATE INDEX idx_commission_date ON commission_entries(date);
