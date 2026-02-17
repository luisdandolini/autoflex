# Autoflex - Frontend

Interface web para o sistema de controle de estoque e sugestão de produção industrial. Desenvolvido com React, TypeScript, Redux Toolkit e Tailwind CSS.

## 📋 Requisitos Funcionais Atendidos

- **RF005** ✅ - Interface para CRUD de produtos
- **RF006** ✅ - Interface para CRUD de matérias-primas
- **RF007** ✅ - Interface para associar matérias-primas aos produtos
- **RF008** ✅ - Interface para visualizar sugestões de produção

## 🚀 Tecnologias

- **React** v19
- **TypeScript** v5.7
- **Redux Toolkit** v2.5 - Gerenciamento de estado global
- **React Router DOM** v7 - Navegação entre páginas
- **Tailwind CSS** v4 - Estilização
- **Axios** - Requisições HTTP
- **React Hot Toast** - Notificações
- **Vite** v6 - Build tool

## 🏗️ Arquitetura

O projeto utiliza **Atomic Design** para organização dos componentes, combinado com **Redux Toolkit** para gerenciamento de estado global.

### Atomic Design:

```
components/
├── atoms/          # Componentes básicos e indivisíveis
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Label.tsx
│
├── molecules/      # Combinação de átomos
│   ├── FormField.tsx
│   └── Card.tsx
│
└── organisms/      # Seções complexas da interface
    ├── Navbar.tsx
    ├── ProductForm.tsx
    ├── ProductFormModal.tsx
    ├── ProductTable.tsx
    ├── RawMaterialForm.tsx
    ├── RawMaterialFormModal.tsx
    └── RawMaterialTable.tsx
```

### Camadas da aplicação:

```
┌──────────────────────────────────────────┐
│ PAGES (Páginas)                          │
│ Conectam Redux com Templates/Organisms   │
└──────────────────┬───────────────────────┘
                   ↓
┌──────────────────────────────────────────┐
│ TEMPLATES (Templates)                    │
│ Estrutura visual das páginas             │
└──────────────────┬───────────────────────┘
                   ↓
┌──────────────────────────────────────────┐
│ ORGANISMS (Organismos)                   │
│ Componentes complexos com estado         │
└──────────────────┬───────────────────────┘
                   ↓
┌──────────────────────────────────────────┐
│ MOLECULES + ATOMS                        │
│ Componentes reutilizáveis básicos        │
└──────────────────────────────────────────┘
```

### Redux Store:

```
store/
├── products/
│   └── productSlice.ts     # Estado + actions + thunks de produtos
└── rawMaterials/
    └── rawMaterialSlice.ts # Estado + actions + thunks de matérias-primas
```

## 📦 Instalação

### Pré-requisitos:

- Node.js v22 ou superior
- Yarn v1.22+
- Backend rodando em `http://localhost:3000`

### Passo a passo:

```bash
# 1. Clonar o repositório
git clone <[repository-url](https://github.com/luisdandolini/autoflex.git)>
cd autoflex

# 2. Instalar dependências
yarn install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Rodar em desenvolvimento
yarn dev
```

O frontend estará disponível em: `http://localhost:5173`

## ⚙️ Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000
```

## 📁 Estrutura de Pastas

```
autoflex-frontend/
├── public/                   # Arquivos estáticos
├── src/
│   ├── components/
│   │   ├── atoms/            # Button, Input, Label
│   │   ├── molecules/        # FormField, Card
│   │   └── organisms/        # Forms, Tables, Modals, Navbar
│   │
│   ├── pages/
│   │   ├── Home/             # Dashboard inicial
│   │   ├── Products/         # CRUD de produtos (via template)
│   │   ├── RawMaterials/     # CRUD de matérias-primas (via template)
│   │   ├── Associations/     # Associar matérias-primas aos produtos
│   │   └── Production/       # Sugestões de produção
│   │
│   ├── store/
│   │   ├── products/         # Redux slice de produtos
│   │   └── rawMaterials/     # Redux slice de matérias-primas
│   │
│   ├── services/
│   │   └── api.ts            # Axios configurado
│   │
│   ├── types/
│   │   ├── Product.ts        # Interface Product
│   │   └── RawMaterial.ts    # Interface RawMaterial
│   │
│   ├── routes/
│   │   └── index.tsx         # Definição de rotas
│   │
│   ├── App.tsx               # Componente raiz + Toaster
│   ├── main.tsx              # Entry point
│   └── index.css             # Tailwind CSS imports
│
├── .env                      # Variáveis de ambiente (não commitado)
├── .env.example              # Template de variáveis
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🖥️ Páginas

### Home (`/`)

- Dashboard com visão geral do sistema
- Atalhos rápidos para todas as funcionalidades

### Products (`/products`)

- Listagem de todos os produtos em tabela
- Criar novo produto (modal)
- Editar produto existente (modal)
- Deletar produto (confirmação)
- Feedback visual com toasts

### Raw Materials (`/raw-materials`)

- Listagem de todas as matérias-primas em tabela
- Criar nova matéria-prima (modal)
- Editar matéria-prima existente (modal)
- Deletar matéria-prima (confirmação)
- Feedback visual com toasts

### Associations (`/associations`)

- Selecionar produto por dropdown
- Visualizar matérias-primas associadas
- Adicionar nova associação (select + quantidade)
- Deletar associação existente
- Filtra automaticamente matérias-primas já associadas

### Production (`/production`)

- Calcular sugestões de produção baseadas no estoque
- Visualizar produtos que podem ser produzidos
- Ver quantidade possível de cada produto
- Ver valor unitário e total de cada produto
- Barra de progresso com % do valor total
- Botão para recalcular
- Priorização por maior valor

## 🎨 Design System

### Componentes Atômicos:

**Button:**

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
<Button disabled={loading}>Loading...</Button>
<Button fullWidth>Full Width</Button>
```

**Input:**

```tsx
<Input
  value={value}
  onChange={(val) => setValue(val)}
  type="number"
  placeholder="Enter value"
  error="Field is required"
/>
```

**FormField (Label + Input):**

```tsx
<FormField
  label="Product Name"
  value={name}
  onChange={setName}
  required
  error={errors.name}
/>
```

**Card:**

```tsx
<Card title="Products List">{/* content */}</Card>
```

## 🔄 Fluxo Redux

```
User Action
    ↓
Dispatch AsyncThunk
    ↓
API Request (Axios)
    ↓
pending → loading: true
    ↓
fulfilled → update state
rejected → error state  + toast
    ↓
Component re-renders
```

### Exemplo de uso:

```tsx
// Dispatch action
const dispatch = useDispatch<AppDispatch>();
dispatch(fetchProducts());
dispatch(createProduct({ code, name, value }));
dispatch(updateProduct({ id, code, name, value }));
dispatch(deleteProduct(id));

// Selecionar estado
const { data, loading, error } = useSelector(
  (state: RootState) => state.products,
);
```

## 🚀 Scripts

```bash
yarn dev        # Rodar em desenvolvimento
yarn build      # Build para produção
yarn preview    # Preview do build
yarn lint       # Verificar erros de lint
```

## 🧪 Testando a Interface

### Fluxo completo:

```
1. Acesse /products
   → Criar produto "Gaming Chair" (P001, $1500)
   → Criar produto "Office Desk" (P002, $800)

2. Acesse /raw-materials
   → Criar matéria-prima "Steel" (R001, stock: 100)
   → Criar matéria-prima "Wood" (R002, stock: 50)

3. Acesse /associations
   → Selecionar "Gaming Chair"
   → Adicionar "Steel" (quantidade: 5)
   → Adicionar "Wood" (quantidade: 10)
   → Selecionar "Office Desk"
   → Adicionar "Steel" (quantidade: 8)

4. Acesse /production
   → Ver sugestões calculadas automaticamente
   → Gaming Chair: 5 unidades → $7.500
   → Office Desk: 6 unidades → $4.800
   → Total: $12.300
```

## 🌐 Deploy

- **Frontend:** https://autoflex.vercel.app
- **Backend API:** https://autoflex-api-5y2p.onrender.com
