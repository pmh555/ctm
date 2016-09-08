# CTM test

A simple CLI application to analyse words in a text file

## Installation

```
npm i
```

## Tests

To run the tests, run the following command:

```
npm test
```

To run a specific test, you can pass `--pattern` and `--grep` arguments to the test runner, e.g.

```
npm test -- --pattern test/lib/Reader.test.js --grep invalid
```

## Code coverage

To create a code coverage report, run the following command:

```
npm run coverage
```

## Running

To parse a text file, run the script using `npm run parse`, passing in the file to be parsed as an argument:

```
npm run parse -- --file Railway-Children-by-E-Nesbit.txt
```

## Saving output

When successful, the script outputs a JSON string containing words and prime numbers; simply redirect the output to save it:

```
npm run parse --silent -- --file Railway-Children-by-E-Nesbit.txt > Railway-Children-by-E-Nesbit.json
```

## Alternative line parser

An alternative line parser can be used by passing a `--mode s` flag. This uses a simple text split to tokenise a line into words.

```
time npm run parse --silent -- --file Railway-Children-by-E-Nesbit.txt --mode s > /dev/null

real    0m0.741s
user    0m0.679s
sys     0m0.077
```

Performance difference between regex and split is minimal; regex is recommended due to improved flexibility and more thorough implementation.

```
time npm run parse --silent -- --file Railway-Children-by-E-Nesbit.txt > /dev/null

real    0m0.731s
user    0m0.670s
sys     0m0.077s
```
