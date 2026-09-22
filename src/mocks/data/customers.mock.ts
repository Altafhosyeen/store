import type { CustomerDto } from "@/features/customers";

export const makeCustomer = (overrides: Partial<CustomerDto> = {}): CustomerDto => ({
  id: "cust-1",
  name: "Cara Nguyen",
  email: "cara.nguyen@example.com",
  orderCount: 3,
  totalSpent: 84.5,
  createdAt: new Date().toISOString(),
  ...overrides,
});

const NAMES = [
  "Cara Nguyen",
  "Liam Patel",
  "Sofia Rossi",
  "Noah Kim",
  "Maya Johnson",
  "Ethan Brooks",
  "Priya Sharma",
  "Lucas Martin",
  "Amara Okafor",
  "Daniel Wu",
  "Grace Anderson",
  "Omar Haddad",
];

export const MOCK_CUSTOMERS: CustomerDto[] = NAMES.map((name, index) => {
  const orderCount = (index % 6) + 1;
  const createdAt = new Date(Date.now() - (NAMES.length - index) * 7 * 86_400_000).toISOString();
  return makeCustomer({
    id: `cust-${index + 1}`,
    name,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    orderCount,
    totalSpent: Math.round((orderCount * (18 + index * 3.4) + Number.EPSILON) * 100) / 100,
    createdAt,
  });
});
