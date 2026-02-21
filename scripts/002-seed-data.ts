// Seed script - Run with: npx tsx scripts/002-seed-data.ts
// Make sure .env.local has the DB_* and JWT_SECRET variables set

import { hash } from "bcryptjs";
import mysql from "mysql2/promise";

const SALT_ROUNDS = 12;

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "Prgs010725",
    database: process.env.DB_NAME || "fgtintas",
  });

  console.log("Conectado ao MySQL. Iniciando seed...");

  // Seed admin user
  const adminHash = await hash("admin123", SALT_ROUNDS);
  await connection.execute(
    `INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    ["admin@fgtintas.com.br", adminHash, "Administrador"]
  );
  console.log("Admin criado: admin@fgtintas.com.br / admin123");

  // Seed professionals
  const proPassword = await hash("123456", SALT_ROUNDS);

  const professionals = [
    {
      id: "pro-1",
      name: "Carlos Silva",
      email: "carlos@email.com",
      phone: "(11) 99999-0001",
      whatsapp: "5511999990001",
      specialty: "Pintura Residencial",
      description: "Pintor profissional com mais de 15 anos de experiencia em pintura residencial. Especializado em acabamentos finos e texturas decorativas.",
      city: "Caieiras",
      state: "SP",
      referral_code: "FG-CAR001",
      commission_balance: 245.50,
    },
    {
      id: "pro-2",
      name: "Roberto Mendes",
      email: "roberto@email.com",
      phone: "(11) 99999-0002",
      whatsapp: "5511999990002",
      specialty: "Pintura Automotiva",
      description: "Especialista em pintura automotiva com tecnicas de alta performance. Trabalho com todas as marcas de tintas automotivas.",
      city: "Franco da Rocha",
      state: "SP",
      referral_code: "FG-ROB002",
      commission_balance: 180.00,
    },
    {
      id: "pro-3",
      name: "Fernando Gomes",
      email: "fernando@email.com",
      phone: "(11) 99999-0003",
      whatsapp: "5511999990003",
      specialty: "Pintura Industrial",
      description: "Profissional com experiencia em pintura industrial e epoxis. Atuo em grandes projetos comerciais e industriais.",
      city: "Sao Paulo",
      state: "SP",
      referral_code: "FG-FER003",
      commission_balance: 0,
    },
    {
      id: "pro-4",
      name: "Marcos Lima",
      email: "marcos@email.com",
      phone: "(11) 99999-0004",
      whatsapp: "5511999990004",
      specialty: "Textura e Grafiato",
      description: "Especialista em texturas, grafiatos e efeitos decorativos. Transformo ambientes com acabamentos unicos e modernos.",
      city: "Guarulhos",
      state: "SP",
      referral_code: "FG-MAR004",
      commission_balance: 92.00,
    },
    {
      id: "pro-5",
      name: "Anderson Rocha",
      email: "anderson@email.com",
      phone: "(11) 99999-0005",
      whatsapp: "5511999990005",
      specialty: "Pintura Predial",
      description: "Pintor predial com equipe completa para grandes projetos. Experiencia em condominios e edificios comerciais.",
      city: "Mairipora",
      state: "SP",
      referral_code: "FG-AND005",
      commission_balance: 350.00,
    },
    {
      id: "pro-6",
      name: "Paulo Henrique",
      email: "paulo@email.com",
      phone: "(11) 99999-0006",
      whatsapp: "5511999990006",
      specialty: "Pintura Decorativa",
      description: "Artista e pintor decorativo. Crio efeitos exclusivos como marmorizado, patina e tecnicas especiais para ambientes sofisticados.",
      city: "Caieiras",
      state: "SP",
      referral_code: "FG-PAU006",
      commission_balance: 0,
    },
  ];

  for (const pro of professionals) {
    await connection.execute(
      `INSERT INTO professionals (id, name, email, password_hash, phone, whatsapp, specialty, description, city, state, referral_code, commission_balance)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name)`,
      [
        pro.id, pro.name, pro.email, proPassword, pro.phone, pro.whatsapp,
        pro.specialty, pro.description, pro.city, pro.state,
        pro.referral_code, pro.commission_balance,
      ]
    );
    console.log(`Profissional criado: ${pro.name} (${pro.email} / 123456)`);
  }

  // Seed commission entries
  const commissions = [
    { id: "c1", professional_id: "pro-1", date: "2025-12-15", client_name: "Maria Oliveira", purchase_value: 12500, commission_value: 125.00 },
    { id: "c2", professional_id: "pro-1", date: "2026-01-20", client_name: "Joao Santos", purchase_value: 8500, commission_value: 85.00 },
    { id: "c3", professional_id: "pro-1", date: "2026-02-10", client_name: "Ana Costa", purchase_value: 3550, commission_value: 35.50 },
    { id: "c4", professional_id: "pro-2", date: "2026-01-05", client_name: "Pedro Almeida", purchase_value: 18000, commission_value: 180.00 },
    { id: "c5", professional_id: "pro-4", date: "2026-02-01", client_name: "Lucia Ferreira", purchase_value: 9200, commission_value: 92.00 },
    { id: "c6", professional_id: "pro-5", date: "2025-11-20", client_name: "Condominio Aurora", purchase_value: 25000, commission_value: 250.00 },
    { id: "c7", professional_id: "pro-5", date: "2026-01-15", client_name: "Empresa ABC", purchase_value: 10000, commission_value: 100.00 },
  ];

  for (const c of commissions) {
    await connection.execute(
      `INSERT INTO commission_entries (id, professional_id, date, client_name, purchase_value, commission_rate, commission_value)
       VALUES (?, ?, ?, ?, ?, 1.00, ?)
       ON DUPLICATE KEY UPDATE client_name = VALUES(client_name)`,
      [c.id, c.professional_id, c.date, c.client_name, c.purchase_value, c.commission_value]
    );
  }
  console.log("Comissoes inseridas.");

  await connection.end();
  console.log("Seed concluido com sucesso!");
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
