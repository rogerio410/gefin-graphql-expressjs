// schema
// #graqhql comments active/infomes its a GraphQL Schema
export const expensesTypeDefs = `#graphql
    type Expense {
        id: String
        description: String
        amount: Float
        category: String
    }

    input CreateExpenseInput {
        description: String
        amount: Float
        category: String
    }

    type Query {
        expenses(skip: Int, take: Int): [Expense]
    }

    type Mutation {
        createExpense(input: CreateExpenseInput): Expense
    }
`;
