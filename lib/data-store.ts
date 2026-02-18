// In-memory data store simulating .NET C# backend with JWT
// For production: replace with actual .NET C# API calls

export interface Professional {
  id: string;
  name: string;
  email: string;
  password: string; // In production: hashed with bcrypt
  phone: string;
  whatsapp: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
  photo: string;
  referralCode: string;
  commissionBalance: number;
  commissionHistory: CommissionEntry[];
  createdAt: string;
  active: boolean;
}

export interface CommissionEntry {
  id: string;
  date: string;
  clientName: string;
  purchaseValue: number;
  commissionRate: number;
  commissionValue: number;
  addedBy: string;
}

export interface AdminUser {
  email: string;
  password: string;
}

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "FG-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// Admin credentials
const admin: AdminUser = {
  email: "admin@fgtintas.com.br",
  password: "admin123",
};

// Sample professionals
const professionals: Professional[] = [
  {
    id: "pro-1",
    name: "Carlos Silva",
    email: "carlos@email.com",
    password: "123456",
    phone: "(11) 99999-0001",
    whatsapp: "5511999990001",
    specialty: "Pintura Residencial",
    description:
      "Pintor profissional com mais de 15 anos de experiencia em pintura residencial. Especializado em acabamentos finos e texturas decorativas.",
    city: "Caieiras",
    state: "SP",
    photo: "",
    referralCode: "FG-CAR001",
    commissionBalance: 245.5,
    commissionHistory: [
      {
        id: "c1",
        date: "2025-12-15",
        clientName: "Maria Oliveira",
        purchaseValue: 12500,
        commissionRate: 1,
        commissionValue: 125.0,
        addedBy: "Admin",
      },
      {
        id: "c2",
        date: "2026-01-20",
        clientName: "Joao Santos",
        purchaseValue: 8500,
        commissionRate: 1,
        commissionValue: 85.0,
        addedBy: "Admin",
      },
      {
        id: "c3",
        date: "2026-02-10",
        clientName: "Ana Costa",
        purchaseValue: 3550,
        commissionRate: 1,
        commissionValue: 35.5,
        addedBy: "Admin",
      },
    ],
    createdAt: "2025-10-01",
    active: true,
  },
  {
    id: "pro-2",
    name: "Roberto Mendes",
    email: "roberto@email.com",
    password: "123456",
    phone: "(11) 99999-0002",
    whatsapp: "5511999990002",
    specialty: "Pintura Automotiva",
    description:
      "Especialista em pintura automotiva com tecnicas de alta performance. Trabalho com todas as marcas de tintas automotivas.",
    city: "Franco da Rocha",
    state: "SP",
    photo: "",
    referralCode: "FG-ROB002",
    commissionBalance: 180.0,
    commissionHistory: [
      {
        id: "c4",
        date: "2026-01-05",
        clientName: "Pedro Almeida",
        purchaseValue: 18000,
        commissionRate: 1,
        commissionValue: 180.0,
        addedBy: "Admin",
      },
    ],
    createdAt: "2025-11-15",
    active: true,
  },
  {
    id: "pro-3",
    name: "Fernando Gomes",
    email: "fernando@email.com",
    password: "123456",
    phone: "(11) 99999-0003",
    whatsapp: "5511999990003",
    specialty: "Pintura Industrial",
    description:
      "Profissional com experiencia em pintura industrial e epoxis. Atuo em grandes projetos comerciais e industriais.",
    city: "Sao Paulo",
    state: "SP",
    photo: "",
    referralCode: "FG-FER003",
    commissionBalance: 0,
    commissionHistory: [],
    createdAt: "2026-01-20",
    active: true,
  },
  {
    id: "pro-4",
    name: "Marcos Lima",
    email: "marcos@email.com",
    password: "123456",
    phone: "(11) 99999-0004",
    whatsapp: "5511999990004",
    specialty: "Textura e Grafiato",
    description:
      "Especialista em texturas, grafiatos e efeitos decorativos. Transformo ambientes com acabamentos unicos e modernos.",
    city: "Guarulhos",
    state: "SP",
    photo: "",
    referralCode: "FG-MAR004",
    commissionBalance: 92.0,
    commissionHistory: [
      {
        id: "c5",
        date: "2026-02-01",
        clientName: "Lucia Ferreira",
        purchaseValue: 9200,
        commissionRate: 1,
        commissionValue: 92.0,
        addedBy: "Admin",
      },
    ],
    createdAt: "2025-12-10",
    active: true,
  },
  {
    id: "pro-5",
    name: "Anderson Rocha",
    email: "anderson@email.com",
    password: "123456",
    phone: "(11) 99999-0005",
    whatsapp: "5511999990005",
    specialty: "Pintura Predial",
    description:
      "Pintor predial com equipe completa para grandes projetos. Experiencia em condominios e edificios comerciais.",
    city: "Mairipora",
    state: "SP",
    photo: "",
    referralCode: "FG-AND005",
    commissionBalance: 350.0,
    commissionHistory: [
      {
        id: "c6",
        date: "2025-11-20",
        clientName: "Condominio Aurora",
        purchaseValue: 25000,
        commissionRate: 1,
        commissionValue: 250.0,
        addedBy: "Admin",
      },
      {
        id: "c7",
        date: "2026-01-15",
        clientName: "Empresa ABC",
        purchaseValue: 10000,
        commissionRate: 1,
        commissionValue: 100.0,
        addedBy: "Admin",
      },
    ],
    createdAt: "2025-09-15",
    active: true,
  },
  {
    id: "pro-6",
    name: "Paulo Henrique",
    email: "paulo@email.com",
    password: "123456",
    phone: "(11) 99999-0006",
    whatsapp: "5511999990006",
    specialty: "Pintura Decorativa",
    description:
      "Artista e pintor decorativo. Crio efeitos exclusivos como marmorizado, patina e tecnicas especiais para ambientes sofisticados.",
    city: "Caieiras",
    state: "SP",
    photo: "",
    referralCode: "FG-PAU006",
    commissionBalance: 0,
    commissionHistory: [],
    createdAt: "2026-02-01",
    active: true,
  },
];

// Data access functions
export function getAllProfessionals(): Professional[] {
  return professionals.filter((p) => p.active);
}

export function getProfessionalById(
  id: string
): Professional | undefined {
  return professionals.find((p) => p.id === id);
}

export function getProfessionalByEmail(
  email: string
): Professional | undefined {
  return professionals.find((p) => p.email === email);
}

export function registerProfessional(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  whatsapp: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
}): Professional {
  const existing = professionals.find((p) => p.email === data.email);
  if (existing) throw new Error("Email ja cadastrado");

  const newPro: Professional = {
    id: generateId(),
    ...data,
    photo: "",
    referralCode: generateReferralCode(),
    commissionBalance: 0,
    commissionHistory: [],
    createdAt: new Date().toISOString().split("T")[0],
    active: true,
  };
  professionals.push(newPro);
  return newPro;
}

export function updateProfessional(
  id: string,
  data: Partial<Professional>
): Professional | undefined {
  const index = professionals.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  professionals[index] = { ...professionals[index], ...data };
  return professionals[index];
}

export function addCommission(
  professionalId: string,
  entry: {
    clientName: string;
    purchaseValue: number;
  }
): Professional | undefined {
  const pro = professionals.find((p) => p.id === professionalId);
  if (!pro) return undefined;

  const commissionValue = entry.purchaseValue * 0.01;
  const newEntry: CommissionEntry = {
    id: generateId(),
    date: new Date().toISOString().split("T")[0],
    clientName: entry.clientName,
    purchaseValue: entry.purchaseValue,
    commissionRate: 1,
    commissionValue,
    addedBy: "Admin",
  };

  pro.commissionHistory.push(newEntry);
  pro.commissionBalance += commissionValue;
  return pro;
}

export function validateAdmin(
  email: string,
  password: string
): boolean {
  return admin.email === email && admin.password === password;
}

export function validateProfessional(
  email: string,
  password: string
): Professional | undefined {
  return professionals.find(
    (p) => p.email === email && p.password === password
  );
}
