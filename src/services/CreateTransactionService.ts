import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type}: Omit<Transaction, 'id'>): Transaction {

    if( type != "income" && type != "outcome"){
      throw Error("Invalid type for transacation");
    }

    if( type === "outcome") {
      const balance = this.transactionsRepository.getBalance();
      
      if ( balance.total < value) {
        throw Error("Invalid balance for this transaction");
      }
    }

    const transaction = this.transactionsRepository.create({ title, value, type});

    return transaction;
  }
}

export default CreateTransactionService;
