const convert = (k: number, n: number): number => {
  if (k === 0 || k === n) {
    return 1
  }

  if (k === 1) {
    return n
  }

  return convert(k - 1, n - 1) + convert(k, n - 1)
}

const pascalTriangle = (height: number) => {
  for (let i = 0; i < height; i++) {
    for (let j = height; j > i; j--) {
      process.stdout.write(' ')
    }

    for (let j = 0; j <= i; j++) {
      process.stdout.write(`${convert(j, i)} `)
    }

    process.stdout.write('\n')
  }
}

pascalTriangle(10)
