// schema
export const expensesTypeDefs = `#graphql
    type Expense{
        description: String
        amount: Float
    }

    type Query{
        expenses: [Expense]
    }
`