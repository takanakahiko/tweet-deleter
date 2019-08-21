import { settings } from './settings'
import TwitterUtil from './twitter-util'

(async () => {
  const repoUrl = 'https://github.com/takanakahiko/tweet-deleter'
  const twitter = new TwitterUtil()
  try {
    const statuses = await twitter.getAllTweets()

    const now = new Date()
    const tokyoTimezoneOffset = -540 * 1000 * 60
    const yesterday0oclock = new Date(
      now.valueOf()
      - (now.valueOf() % 86400000)
      - 86400000
      + tokyoTimezoneOffset,
    )

    const { exceptionIds } = settings()

    const statusesToDelete = statuses.filter((status) => {
      if (exceptionIds.includes(status.id_str)) { return false }
      if (new Date(status.created_at) > yesterday0oclock) { return false }
      return true
    })

    let count = 0
    for (const status of statusesToDelete) {
      const rootIds = [
        '1130812094855749632', // いきなりステーキの反対語選手権
        '1156837082205081600', // ことばパレット
        '1163294213032665093', // 就活完了
      ]
      const isKeep = await twitter.isInTree(status.id_str, rootIds)
      if (!isKeep) {
        await twitter.destroy(status.id_str)
        count++
      }
    }

    await twitter.tweet(`【BOT】 ${count}個のツイートを削除しました\n${repoUrl}`)
  } catch (error) {
    console.log(error)
    await twitter.tweet(`【BOT】 エラーが発生しました: ${error}`)
  }
})()
