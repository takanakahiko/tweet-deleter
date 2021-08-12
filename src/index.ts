import { settings, Setting } from './settings'
import TwitterUtil from './twitter-util'

export interface Status {
  id_str: string,
  full_text: string,
  entities: {
    hashtags?: { text: string }[] | null
  },
  created_at: string
}

export const is消したい = (status: Status, setting: Setting, boundaryDate: Date): boolean => {
  const { exceptionIds, keepTags, keepTexts } = setting
  if (exceptionIds.includes(status.id_str)) { return false }
  if (keepTexts.some((keepText) => keepText.test(status.full_text))) { return false }
  if ( status.entities.hashtags ) {
    for ( const tag of status.entities.hashtags ) {
      if (keepTags.includes(tag.text)) { return false }
    }
  }
  if (new Date(status.created_at) > boundaryDate) { return false }
  return true
}

const main = async () => {
  const repoUrl = 'https://github.com/takanakahiko/tweet-deleter'
  const twitter = new TwitterUtil()
  try {
    const statuses = await twitter.getAllTweets()

    const now = new Date()
    const tokyoTimezoneOffset = -9 * 1000 * 60 * 60
    const yesterday0oclock = new Date(
      now.valueOf()
      - (now.valueOf() % 86400000)
      - 86400000
      + tokyoTimezoneOffset,
    )

    const setting = settings()

    const statusesToDelete = statuses.filter((status) => {
      return is消したい(status, setting, yesterday0oclock)
    })

    for (const status of statusesToDelete) {
      await twitter.destroy(status.id_str)
    }

    if (statusesToDelete.length) await twitter.tweet(`【BOT】 ${statusesToDelete.length}個のツイートを削除しました\n${repoUrl}`)
  } catch (error) {
    console.log(error)
    await twitter.tweet(`【BOT】 エラーが発生しました: ${error}`)
    throw error
  } finally {
    process.exitCode = 0;
  }
}

if (require.main === module) {
  main()
}
