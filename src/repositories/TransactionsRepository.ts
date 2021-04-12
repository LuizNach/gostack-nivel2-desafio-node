import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    
    let income = this.transactions.reduce((sum, transaction) => { return transaction.type == 'income' ? sum + transaction.value: sum} , 0);
    let outcome = this.transactions.reduce((sum, transaction) => { return transaction.type == 'outcome' ? sum + transaction.value: sum} , 0);
    let total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type}: Omit<Transaction, 'id'>): Transaction {

    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
