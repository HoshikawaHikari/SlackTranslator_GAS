// SlackAppのトークン
// GASのプロジェクトプロパティで設定して読み込んだ方が良いかも
var TOKEN = "xoxp-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

// 元のメッセージを引用として含める
var QUOTE = true;
// 元のメッセージを参照として含める
var REF_QUOTE = false;
// 元のメッセージを参照として含める時、URLを非表示にする
var REF_QUOTE_HIDE_URL = true;
// 元のメッセージを参照として含める時、URLの展開を行う
var REF_QUOTE_UNFURL = false;

// デバッグ出力をする
var DEBUG = true;
// デバッグ時にデバッグ用Slackチャンネルにメッセージを出力する.
// UrlFetchApp回数を消費するので注意(と言っても1日2万回までfetch出来るので大規模じゃなければ大丈夫)
var DEBUG_POST = false;
var DEBUG_TOKEN = "xoxp-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
var DEBUG_CHANNEL = "XXXXXXXXX";


function doGet(e) {
  console.warn("Not supported doGet");
  return ContentService.createTextOutput("Not supported doGet");
}


function doPost(e) {
  try {
    postDebugMessageText("doPost-----------");
    
    var json = JSON.parse(e.postData.getDataAsString());
    
    if (json.type == "url_verification") {
      return ContentService.createTextOutput(json.challenge);
    }
    
    // https://api.slack.com/events/reaction_added
    // scope: "reactions:read"
    if (json.type == "event_callback" && json.event.type == "reaction_added") {
      return ContentService.createTextOutput(onReactionAdded(json.event));
    }
  } catch (ex) {
    console.error(ex);
  }
}


function onReactionAdded(json) {
  postDebugMessage(json);
  
  var channel = json.item.channel;
  var type = json.item.type;
  var ts = json.item.ts;
  //var thread_ts = json.item.thread_ts;
  var reaction = json.reaction;
  
  if (type == "message") {
    var messages = getMessages(channel, ts);
    postDebugMessage(messages);
    if (messages) {
      var message = messages[0].text;
      var reactioneds = messages[0].reactions;
      //var languagePrefix;
      var translateTo = getTranslateCode(reaction, reactioneds);
      
      if (translateTo) {
        //var translatedMessage = languagePrefix + " " + LanguageApp.translate(message, "", translateTo);
        var translatedMessage = LanguageApp.translate(message, "", translateTo);
        var resText = adjustmentText(translatedMessage);
        
        if (REF_QUOTE) {
          var link = getPermaLink(channel, ts);
          if (REF_QUOTE_HIDE_URL){
            resText += "\n\n <" + link + "|-- origin -->";
          }else{
            resText += "\n\n <" + link + ">";
          }
        }
        
        if (QUOTE) {
          resText += "\n>>> " + message;
        }
        
        postThreadMessage(channel, ts, resText, REF_QUOTE_UNFURL);
        
        //if (REF_QUOTE) {
        //  var url = getPermaLink(channel, ts);
        //  postUnfurlingLink(channel, ts, url);
        //}
      }
    }
  }
  return "OK";
}


function getTranslateCode(reaction, reactioneds)
{
  var translateTo;
      
  if ((reaction == "en") && !isTranslateReactioned(reactioneds, reaction)) {
    translateTo = "en";
  }
  if ((reaction == "ja") && !isTranslateReactioned(reactioneds, reaction)) {
    translateTo = "ja";
  }
  return translateTo;
}


// メッセージを投稿
// https://api.slack.com/methods/chat.postMessage
// scope: "chat:write:user" or "chat:write:bot"
function postThreadMessage(channel, ts, text, unfurl_links)
{
  if (channel && ts && text)
  {
    var url = "https://slack.com/api/chat.postMessage";
      
    var headers = {
      "Authorization": "Bearer " + TOKEN
    };
      
    var payload = {
      "channel" : channel,
      "text" : text,
      "thread_ts" : ts,
      "unfurl_links" : unfurl_links
    };
      
    var options = {
      "method" : "post",
      "contentType" : "application/json",
      "headers" : headers,
      "payload" : JSON.stringify(payload)
    };
    
    try {
      var response = UrlFetchApp.fetch(url, options);
      console.log(response.getContentText());
    } catch(e) {
      console.error(e);
      //postDebugMessageText(e);
    }
  }
}


// 指定のメッセージ情報を取得
// https://api.slack.com/methods/conversations.replies
// "channels:history" or "groups:history"
function getMessages(channel, ts) {
  var response = UrlFetchApp.fetch("https://slack.com/api/conversations.replies?token=" + TOKEN + "&channel=" + channel + "&ts=" + ts + "&limit=1");
  var json = JSON.parse(response.getContentText());
  return json.messages;
}


// 指定のメッセージへのリンクを取得
function getPermaLink(channel, ts) {
  var response = UrlFetchApp.fetch("https://slack.com/api/chat.getPermalink?token=" + TOKEN + "&channel=" + channel + "&message_ts=" + ts);
  var json = JSON.parse(response.getContentText());
  return json.permalink;
}


// 指定メッセージにURLを展開して表示させる
function postUnfurlingLink(channel, ts, url) {
  if(channel && ts && url) {
    UrlFetchApp.fetch("https://slack.com/api/chat.unfurl?token=" + TOKEN + "&channel=" + channel + "&ts=" + ts + "&unfurls=" + encodeURIComponent(url));
  }
}

// スレッド内に翻訳メッセージが無いか確認
// 翻訳メッセージにlanguagePrefixを付けておいてそれをチェック
//function isTranslated(messages, languagePrefix) {
//  for (var i in message
//    var message = messages[i];
//    if (message.text.substring(0, languagePrefix.length) == languagePrefix) {
//      return true;
//    }
//  }
//  return false;
//}


// そのメッセージに翻訳用リアクションがあるか確認
function isTranslateReactioned(reactions, lang) {
  for (var i in reactions) {
    var reaction = reactions[i];
    if (reaction.name == lang)
    {
      return (reaction.count > 1);
    }
  }
  return false;
}


// Google翻訳さんによっておかしくなった記号等の調整
// Googleさんの気分次第なのでわりと不安定
function adjustmentText(message)
{
  // ```は翻訳を通すと`` `となる場合があるので修正
  return message.replace(/`` `/g, "```");
}


function postDebugMessage(json) {
  if(!DEBUG){ return; }
  
  channel = DEBUG_CHANNEL;
  text = JSON.stringify(json);
  console.log(text);
  if (DEBUG_POST) {
    try{
      var url = "https://slack.com/api/chat.postMessage";
      
      var headers = {
        "Authorization": "Bearer " + DEBUG_TOKEN
      };
      
      var payload = {
        "channel" : channel,
        "text" : text
      };
      
      var options = {
        "method" : "post",
        "contentType" : "application/json",
        "headers" : headers,
        "payload" : JSON.stringify(payload)
      };
      var response = UrlFetchApp.fetch(url, options);
      
    } catch(e) {
      console.error(e);
      Logger.log(e);
      UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + DEBUG_TOKEN + "&channel=" + encodeURIComponent(channel) + "&text=Error-" + encodeURIComponent(e));
    }
  }
}


function postDebugMessageText(text) {
  if(!DEBUG){ return; }
  
  var channel = DEBUG_CHANNEL;
  console.log(text);
  Logger.log(text);
  if (DEBUG_POST) {
    try{
      var url = "https://slack.com/api/chat.postMessage";
      
      var headers = {
        "Authorization": "Bearer " + DEBUG_TOKEN
      };
      
      var payload = {
        "channel" : channel,
        "text" : text
      };
      
      var options = {
        "method" : "post",
        "contentType" : "application/json",
        "headers" : headers,
        "payload" : JSON.stringify(payload)
      };
      var response = UrlFetchApp.fetch(url, options);
      
    } catch(e) {
      console.error(e);
      Logger.log(e);
      UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + DEBUG_TOKEN + "&channel=" + encodeURIComponent(channel) + "&text=Error-" + encodeURIComponent(e));
    }
  }
}
