## Demo install

Please do not judge me for committing DB password to git (.env.common / .env.demo).

I just wanted to reduce an amount of work for you.

First you need to install traefik

```bash
$ make traefik-up
```
You probably will also need to update /etc/hosts with record:
```
127.0.0.1	api.housing-loan-demo.test
```

Then run containers

```bash
$ make demo-up-and-init
```

And start app... 

```bash
$ make demo-start
```

## Make API call

```
curl --request POST http://api.housing-loan-demo.test/amortization-table -H 'Content-Type: application/json' --data-binary '{"loanConfig": "housing1", "amountOfYears": 25, "installmentType": "equal", "amountOfMoney": 300000}'
```

## Run tests

```bash
$ make demo-test
```
