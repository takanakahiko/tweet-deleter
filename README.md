# tweet-deleter

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/75asa/tweet-deleter/tree/master)

## Whats this?

Delete your 2 or more days ago tweets Automatically.

## Usage (local)

fork and clone and ...

```bash
$ cp _env .env
```

or

```bash
$ export CONSUMER_KEY=XXXXXXXXXXXX
$ export CONSUMER_SECRET=YYYYYYYYYYYYYYYYYY
$ export ACCESS_TOKEN=ZZZZZZZZZZZZZZZZZZZZZZZZ
$ export ACCESS_TOKEN_SECRET=HOGEEEEEEEEEEEEEEEEEEEEEE
```

and

```bash
$ npm i
$ npm run start
```

## Usage (GitHub Actions)

1. fork
2. Set `Secrets` on Repository ( CONSUMER_KEY / CONSUMER_SECRET / ACCESS_TOKEN / ACCESS_TOKEN_SECRET)
3. Automatically run at 0 o'clock Japan time ( GMT+09:00 )

## License

MIT &copy; takanakahiko
