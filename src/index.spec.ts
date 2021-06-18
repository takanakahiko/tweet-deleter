import { expect, Test, TestSuite } from 'testyts';
import { Status, is消したい } from './index';
import { Setting } from './settings'

@TestSuite()
export class MyTestClass {

  @Test()
  public delete(): void {
    const status: Status = {
      id_str: "",
      full_text: "",
      entities: {},
      created_at: (new Date()).toDateString()
    }
    const setting: Setting = {
      consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "", 
      keepTags: [],
      exceptionIds: [],
      keepTexts: [],
    }
    const boundaryDate = new Date()

    expect.toBeEqual(is消したい(status, setting, boundaryDate), true);
  }

  @Test()
  public keep_by_id(): void {
    const status: Status = {
      id_str: "12345",
      full_text: "",
      entities: {},
      created_at: (new Date()).toDateString()
    }
    const setting: Setting = {
      consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "", 
      keepTags: [],
      exceptionIds: ["12345"],
      keepTexts: [],
    }
    const boundaryDate = new Date()

    expect.toBeEqual(is消したい(status, setting, boundaryDate), false);
  }

  @Test()
  public keep_by_tag(): void {
    const status: Status = {
      id_str: "",
      full_text: "",
      entities: {
        hashtags: [{ text: "hoge"}]
      },
      created_at: (new Date()).toDateString()
    }
    const setting: Setting = {
      consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "", 
      keepTags: ["hoge"],
      exceptionIds: [],
      keepTexts: [],
    }
    const boundaryDate = new Date()

    expect.toBeEqual(is消したい(status, setting, boundaryDate), false);
  }

  @Test()
  public keep_by_text(): void {
    const status: Status = {
      id_str: "",
      full_text: "hogehuga",
      entities: {},
      created_at: (new Date()).toDateString()
    }
    const setting: Setting = {
      consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "", 
      keepTags: [],
      exceptionIds: [],
      keepTexts: [/hoge/],
    }
    const boundaryDate = new Date()

    expect.toBeEqual(is消したい(status, setting, boundaryDate), false);
  }

  @Test()
  public keep_by_date(): void {
    const status: Status = {
      id_str: "",
      full_text: "hogehuga",
      entities: {},
      created_at: (new Date()).toDateString()
    }
    const setting: Setting = {
      consumerKey: "", consumerSecret: "", accessToken: "", accessTokenSecret: "", 
      keepTags: [],
      exceptionIds: [],
      keepTexts: [/hoge/],
    }
    const boundaryDate = new Date(Date.now() - 1000 * 10) // 10秒ぐらい前

    expect.toBeEqual(is消したい(status, setting, boundaryDate), false);
  }

}
