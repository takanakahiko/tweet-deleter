import { settings } from './settings'
import TwitterUtil from './twitter-util'

(async () => {
  const twitter = new TwitterUtil()
  try {
    const statuses = await twitter.getAllTweets()

    const now = new Date()
    const tokyoTimezoneOffset = -540 * 1000 * 60
    const yesterday0oclock = new Date(
      now.valueOf() -
        (now.valueOf() % 86400000) -
        86400000 +
        tokyoTimezoneOffset,
    )

    const { exceptionIds } = settings()

    const statusesToDelete = statuses.filter((status) => {
      if (exceptionIds.includes(status.id_str)) { return false }
      if (new Date(status.created_at) > yesterday0oclock) { return false }
      return true
    })

    for (const status of statusesToDelete) {
      await twitter.destroy(status.id_str)
    }

    const completeMessage = `【BOT】 ${
      statusesToDelete.length
    }個のツイートを削除しました。(TweetDeleter : ${new Date()}`
    await twitter.tweet(completeMessage)
  } catch (error) {
    const errorMessage = `【BOT】 エラーが発生しました: ${error} (TweetDeleter)`
    await twitter.tweet(errorMessage)
  }
})()
