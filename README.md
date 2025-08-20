# class

## Entidade

- Eventos
- Ingressos
- Usuarios
- Pedidos
- Check-in

## Estrutura de pastas

src/
├── application/
│ ├── use-cases/
│ └── services/
│
├── domain/
│ ├── entities/
│ └── repositories/
│
├── infra/
│ ├── database/
│ ├── http/
│ └── providers/
│
├── shared/
│ ├── config/
│ ├── errors/
│ └── utils/
│
├── tests/
│
├── server.ts

## Conceitos SOLID aplicados

1. Single Responsibility Principle **(SRP)**

- Cada camada/função tem sua responsabilidade bem definida.
- Ex: Criar evento não envia email

2. Open/Closed Principle **(OCP)**

- Casos de uso podem receber diferentes repositórios sem mudar o código.
- Ex: Um repository pode ser em mongodb ou postgres

3. Liskov Substitution Principle **(LSP)**

- Interfaces de repositórios (IEventoRepository) garantem que qualquer implementação funcione sem quebrar.

4. Interface Segregation Principle **(ISP)**

- Repositórios focados em contratos específicos.
- Ex: Ingressos só lida com ingressos, sem misturar com usuários.

5. Dependency Inversion Principle **(DIP)**

- Casos de uso não conhecem detalhes do banco, apenas interfaces.
