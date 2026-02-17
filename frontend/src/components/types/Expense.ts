export interface Expense{
    _id: string,
    userId: string,
    name: string, 
    cost: number, 
    description: string,
    date: Date,
    categoryId: string
}