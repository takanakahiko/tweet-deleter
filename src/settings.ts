interface Setting {
  consumerKey: string
  consumerSecret: string
  accessToken: string
  accessTokenSecret: string
  exceptionIds: string[]
}

export function settings(): Setting {
  return {
    consumerKey: process.env.CONSUMER_KEY || '',
    consumerSecret: process.env.CONSUMER_SECRET || '',
    accessToken: process.env.ACCESS_TOKEN || '',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    exceptionIds: [
      '825373820512899074',
      '1013765942952669185',
      '1043116090967044097',
      '1085189018797535233',
      '1085219841189892096',
      '1102598477203140609',
      '1102603760600211456',
      '1102608720956076032',
      '1106449960164163584',
      '1112564975653081088',
      '1112603128866594816',
      '1112739204184702976',
      '1171639096613072896',
      '1179030460669628416',
      '1179032075136991233',
      '1196314802726944769',
      '1196318804269101062',
      '1196319714898694144',
      '1204820013883912192',
      '1204940632747171841',
      '1204947682525007873',
      '1217101599891308544',
      '1217101911913975808',
      '1217104019908259844',
      '1217681907913068545',
      '1235350728182394880',
      '1235385884238704643',
      '1235755953435209729',
      '1245725694652375042',
    ],
  }
}
