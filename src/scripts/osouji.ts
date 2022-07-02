// すでに消えたツイートが設定に紛れ込んでいるのを検知するための書き捨てのやつ

import { settings } from '../settings'
import TwitterUtil from '../twitter-util'

const main = async () => {
  const twitter = new TwitterUtil()
  settings().exceptionIds

  const removedTweetIds: string[] = []
  
  for(const id of settings().exceptionIds) {
    try {
        await twitter.show(id)
    } catch(error) {
        if(error.statusCode == 404) {
            removedTweetIds.push(id)
        } else {
            console.log(error)
            break
        }
    }
  }
  
  console.log('すでに消されているツイートIDなのに設定に入っているやつだよ')
  console.log(removedTweetIds)
}

if (require.main === module) {
  main()
}
