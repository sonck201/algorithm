const convertMoney = (listCurrency: number[], minExpected: number, myAmount: number) => {
  const dp = [Number.MAX_VALUE]

  for (let i = 0; i <= myAmount; i++) {
    dp[i] = 0
  }

  for (let i = 0; i < minExpected; i++) {
    dp[listCurrency[i]] = 1
  }

  for (let i = 1; i <= myAmount; i++) {
    for (let j = 0; j < minExpected; j++) {
      if (i >= listCurrency[j]) {
        if (
          (dp[i] > dp[i - listCurrency[j]] + 1 && dp[i - listCurrency[j]] != 0) ||
          (dp[i] == 0 && dp[i - listCurrency[j]] != 0)
        ) {
          dp[i] = dp[i - listCurrency[j]] + 1
        }
      }
    }
  }

  return dp[myAmount]
}

const convertMoney2 = (listCurrency: number[], minExpected: number, myAmount: number) => {
  const dp = [Number.MAX_VALUE]

  for (let i = 0; i <= myAmount; i++) {
    dp[i] = Infinity
  }

  for (let i = 0; i < minExpected; i++) {
    dp[listCurrency[i]] = 1
  }

  dp[0] = 0

  // For i = 1 to S
  // For j = 0 to N - 1
  // If(Vj <= i AND Min[i - Vj] + 1 < Min[i])
  // Then Min[i] = Min[i - Vj] + 1
  for (let i = 1; i <= myAmount; i++) {
    for (let j = 0; j < minExpected; j++) {
      if (listCurrency[j] <= i && dp[i - listCurrency[j]] + 1 < dp[i]) {
        dp[i] = dp[i - listCurrency[j]] + 1
      }
    }
  }

  return dp[myAmount]
}

const outputToConsole = (listCurrency: number[], minExpected: number, myAmount: number) => {
  return {
    listCurrency: listCurrency.join(', '),
    minExpected,
    myAmount,
    minAmount: convertMoney(listCurrency, minExpected, myAmount),
    minAmount2: convertMoney2(listCurrency, minExpected, myAmount),
  }
}

console.table([
  outputToConsole([1, 2, 5], 3, 14),
  outputToConsole([1, 2, 8, 10], 4, 25),
  outputToConsole([2, 4, 6, 8, 10], 0, 9),
])
