import * as Twit from 'twit'
import { Status } from 'twitter-d'
import * as bigInt from 'big-integer'
import { settings } from './settings'

export default class TwitterUtil {
  private twitter: Twit

  constructor() {
    this.twitter = new Twit({
      consumer_key: settings().consumerKey,
      consumer_secret: settings().consumerSecret,
      access_token: settings().accessToken,
      access_token_secret: settings().accessTokenSecret,
    })
  }

  public async getAllTweets(): Promise<Status[]> {
    let tweets: Status[] = []
    const payload: { [s: string]: string | number | boolean } = {
      count: 200,
      trim_user: true,
      tweet_mode: 'extended',
    }
    while (true) {
      const ret = await this.twitter.get('statuses/user_timeline', payload)
      const statuses = ret.data as Status[]
      if (statuses.length === 0) { break }
      payload.max_id = bigInt(statuses[statuses.length - 1].id_str)
        .plus(-1)
        .toString()
      tweets = tweets.concat(statuses)
    }
    return tweets
  }

  public async tweet(text: string): Promise<void> {
    const payload = {
      status: text,
    }
    await this.twitter.post('statuses/update', payload)
  }

  public async destroy(id: string): Promise<void> {
    const payload = {
      id,
    }
    await this.twitter.post('statuses/destroy/:id', payload)
  }
}
