import accounts from './accounts.json'

interface Person {
  applications: string[],
  emails: string[],
  name: string
}

interface Account {
  application: number,
  emails: string[],
  name: string
}

let mergedAccounts: Person[]
let lookedAtIndices: number[]
let relatedEmails: string[][] = [[]]
let indexOfCurrentRelatedEmailGroup: number = 0
let indicesOfCurrentRelatedAccounts: number[]
let emailAlreadyInGroup: boolean = false;

export const accountMerge = (accounts: Account[]) => {
  //empty arrays between tests
  mergedAccounts = [] 
  lookedAtIndices = []
  relatedEmails = [[]]
  indicesOfCurrentRelatedAccounts = []


  accounts.map((account, i) => {
    if(!lookedAtIndices.includes(i)){
      gatherRelatedEmails(accounts, account, i)
    }
    indexOfCurrentRelatedEmailGroup++
    relatedEmails.push([])
  })
  console.log(mergedAccounts)
  return mergedAccounts
}

const gatherRelatedEmails = (
  accounts: Account[],
  currentAccount: Account, 
  indexOfCurrentAccount: number, 
  ) => {
  indicesOfCurrentRelatedAccounts = []
  currentAccount.emails.map(email => {
    if(!relatedEmails[indexOfCurrentRelatedEmailGroup]?.includes(email)) {
        relatedEmails[indexOfCurrentRelatedEmailGroup]?.push(email)
      }
  }) 
  lookedAtIndices.push(indexOfCurrentAccount)
  indicesOfCurrentRelatedAccounts.push(indexOfCurrentAccount)
  loopAccounts(accounts)
  mergeAccounts(accounts)
}

const loopAccounts = (accounts: Account[]) => {
  accounts.map((acc, i) => {
    acc.emails.map(email => {
      relatedEmails?.map((emailGroup, i) => {
        if(i !== indexOfCurrentRelatedEmailGroup && emailGroup?.includes(email)) emailAlreadyInGroup = true
      })
      addRelatedEmails(email, i, acc)
    })
  })
}

const addRelatedEmails = (email: string, relatedEmailsIndex: number, acc: Account) => {
  if(!emailAlreadyInGroup && relatedEmails[indexOfCurrentRelatedEmailGroup]?.includes(email)) {
    if(!lookedAtIndices.includes(relatedEmailsIndex)) {
      lookedAtIndices.push(relatedEmailsIndex)
      indicesOfCurrentRelatedAccounts.push(relatedEmailsIndex)
    }
    acc.emails.map(currentEmail => {
      if(currentEmail !== email 
        && !relatedEmails[indexOfCurrentRelatedEmailGroup].includes(currentEmail) 
        ){
          relatedEmails[indexOfCurrentRelatedEmailGroup].push(currentEmail)
          loopAccounts(accounts)
        }
    })
  }
}

const mergeAccounts = (accounts: Account[]) => {
  const firstRelatedAccountIndex: number = indicesOfCurrentRelatedAccounts[0]
  let mergedAccount: Person = {
    applications: [accounts[firstRelatedAccountIndex].application.toString()], 
    emails: [...accounts[firstRelatedAccountIndex].emails], 
    name: accounts[firstRelatedAccountIndex].name
  }
  for (let i = 1; i < indicesOfCurrentRelatedAccounts.length; i++){
    const currentAccount: Account = accounts[indicesOfCurrentRelatedAccounts[i]]
    const emailsToAdd: string[] = []
    currentAccount.emails.map(email => {if(!mergedAccount.emails.includes(email)) emailsToAdd.push(email)})
    const newMergedAccount: Person = {
      applications: [...mergedAccount.applications, currentAccount.application.toString()],
      emails: [...mergedAccount.emails, ...emailsToAdd],
      name: mergedAccount.name
    }
    mergedAccount = newMergedAccount
  }
  mergedAccounts.push(mergedAccount)
}

accountMerge(accounts)
