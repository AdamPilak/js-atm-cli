const Account = require('./Account')
const CommandLine = require('./CommandLine')

async function main() {
  try {
    const accountName = await CommandLine.ask(
        'Which account would you like to acces?'
      )
    
      const account = await Account.find(accountName)
      if (account == null) account = await promptCreateAccount(accountName)
      if (account != null) await promptTask(account)
  } catch {
    CommandLine.print('ERROR: Please try again.')
  }
}

async function promptCreateAccount(accountName) {
  const response = await CommandLine.ask(
    'That account does not exist. Would you like to create it? (yes/no)'
  )

  if (response.toLowerCase() === 'yes' || response.toLowerCase() === 'y') {
    return await Account.create(accountName)
  }
}

async function promptTask(account) {
  const response = await CommandLine.ask(
    'What would you like to do? (view/deposit/withdraw)'
  )

  switch (response.toLowerCase()) {
    case 'deposit':
      {
        const amount = parseFloat(
          await CommandLine.ask('How much would you like to deposit?')
        )
        await account.deposit(amount)
        account.view()
      }
      break
    case 'withdraw':
      {
        const amount = parseFloat(
          await CommandLine.ask('How much would you like to withdraw?')
        )

        try {
          await account.withdraw(amount)
          account.view()
        } catch {
          CommandLine.print('Not enough money.')
        }
      }
      break
    default:
      account.view()
  }
}

main()
