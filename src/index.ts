import { settings } from './settings'
import TwitterUtil from './twitter-util'

const main = async () => {
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

    const { exceptionIds, keepTags, keepTexts } = settings()

    const statusesToDelete = statuses.filter((status) => {
      if (exceptionIds.includes(status.id_str)) { return false }
      if (keepTexts.some((keepText) => keepText.test(status.full_text))) { return false }
      if ( status.entities.hashtags ) {
        for ( const tag of status.entities.hashtags ) {
          if (keepTags.includes(tag.text)) { return false }
        }
      }
      if (new Date(status.created_at) > yesterday0oclock) { return false }
      return true
    })

    // let count = 0
    // for (const status of statusesToDelete) {
    //   const rootIds = [
    //   ]
    //   const isKeep = await twitter.isInTree(status.id_str, rootIds)
    //   if (!isKeep) {
    //     await twitter.destroy(status.id_str)
    //     count++
    //   }
    // }

    for (const status of statusesToDelete) {
      await twitter.destroy(status.id_str)
    }

    await twitter.tweet(`【BOT】 ${statusesToDelete.length}個のツイートを削除しました\n${repoUrl}`)
  } catch (error) {
    console.log(error)
    await twitter.tweet(`【BOT】 エラーが発生しました: ${error}`)
    throw error
  }
}

main()
