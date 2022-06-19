import { accountMerge } from '../src/accounts';

describe('testing account merge', () => {
  const data1 = [
    {
      "application": 1,
      "emails": ["a@gmail.com", "b@gmail.com"],
      "name": "A"
    },
    {
      "application": 1,
      "emails": ["c@gmail.com", "d@gmail.com"],
      "name": "C"
    },
    {
      "application": 2,
      "emails": ["a@yahoo.com"],
      "name": "A"
    },
    {
      "application": 3,
      "emails": ["a@gmail.com", "a@yahoo.com"],
      "name": "A"
    }
  ]
  test('3 of 4 accounts get merged', () => {
    expect(accountMerge(data1).forEach(account => account.name)).toEqual(["A", "C"].forEach(name => name))
    expect(accountMerge(data1).forEach(account => account.applications)).toEqual([["1", "3", "2"], ["1"]].forEach(application => application))
    expect(accountMerge(data1).forEach(account => account.emails)).toEqual([["a@gmail.com", "b@gmail.com", "a@yahoo.com"], ["c@gmail.com", "d@gmail.com"]].forEach(email => email))
  });
  const data2 = [
    {
      "application": 1,
      "emails": ["a", "b", "c"],
      "name": "Person 1"
    },
    {
      "application": 2,
      "emails": ["c", "d"],
      "name": "Person 1"
    }
  ]
  test("all accounts get merged", () => {
    expect(accountMerge(data2).forEach(account => account.name)).toEqual([ "Person 1"].forEach(name => name))
    expect(accountMerge(data2).forEach(account => account.applications)).toEqual([["1", "2"]].forEach(application => application))
    expect(accountMerge(data2).forEach(account => account.emails)).toEqual([["a", "b", "c", "d"]].forEach(email => email))
  });
  const data3 = [
    {
      "application": 1,
      "emails": ["a", "b", "c"],
      "name": "Person 1"
    },
    {
      "application": 2,
      "emails": ["f", "g"],
      "name": "Person 1"
    }
  ]
  test("no accounts get merged", () => {
    expect(accountMerge(data3).forEach(account => account.name)).toEqual([ "Person 1", "Person1"].forEach(name => name))
    expect(accountMerge(data3).forEach(account => account.applications)).toEqual([["1"], ["2"] ].forEach(application => application))
    expect(accountMerge(data3).forEach(account => account.emails)).toEqual([["a", "b", "c"], ["f", "g"]].forEach(email => email))
  });
});
