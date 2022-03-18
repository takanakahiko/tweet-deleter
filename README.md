<p align="center">
<img width="586" alt="image" src="https://user-images.githubusercontent.com/10114717/158940203-8cf44143-a643-48e2-8ff6-47d7c3bec80c.png">
</p>

# tweet-deleter

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/takanakahiko/tweet-deleter/tree/master)

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

## Usage  (Heroku)

1. push [Deploy to] button on top of this page
2. Set `Secrets` on Deploy View ( CONSUMER_KEY / CONSUMER_SECRET / ACCESS_TOKEN / ACCESS_TOKEN_SECRET)
3. Set Heroku Scheduler. recommend once a day at 0 oclock. like a this

[![Image from Gyazo](https://i.gyazo.com/23ac5cbfd85f96a90e582d4798aec5df.png)](https://gyazo.com/23ac5cbfd85f96a90e582d4798aec5df)

## License

MIT &copy; takanakahiko
