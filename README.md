# SlackTranslator

Slackでリアクションに対して反応する翻訳ボット。  
Translation bot that responds to Emoji Reactions in Slack.


## Getting Started

特定の絵文字のリアクションがついたことを検知して動作するSlackの翻訳ボットです。

Google Apps Script (GAS) を使っているので、無料で最大1日1万回の実行が可能です。  
※同じGoogleアカウントの他のGASでURLFetchが使われておらず、パーマリンク等を使用しない設定の場合の最大数。

導入手順は [Installation](https://github.com/HoshikawaHikari/SlackTranslator_GAS#Installation) を参考にして下さい。


## Prerequisites

- Slackにアプリを追加する権限があること。

## Installation


### Create Slack App

まず [SlackApp](https://api.slack.com/apps) の作成を行います。  
新規SlackAppにイベントの設定と権限スコープの設定をしてワークスペースにインストールします。

1. [Create New App] ボタンを押してSlackAppを新規作成します。

2. [Event Subscriptions] をONにして [Subscribe to workspace events] に "reaction_added" を追加します。
![2020-02-13 19 19 11 api slack com 42e445c05fcd](https://user-images.githubusercontent.com/16908935/74427767-0fc9c400-4e9b-11ea-80f8-5746507227ad.jpg)

3. [OAuth & Permissions] > [Scopes] > [Bot Token Scopes] に必要なスコープを追加します。  
   最低限必要なものは "reactions:read", "channels:history", "chat:write" です。
![2020-02-13 19 59 34 api slack com fb55921afb42](https://user-images.githubusercontent.com/16908935/74427925-61724e80-4e9b-11ea-82bc-ca32721007cf.jpg)

4. [OAuth & Permissions] > [OAuth Tokens & Redirect URLs] 項目の [Install App to WorkSpace] ボタンを押してワークスペースにインストールします。

5. インストールしたら OAuth Access Token が表示されるのでGAS側で使う為に控えておきます。


### Create Google Apps Script

GAS側の設定を行います。  
新規GASにSlackTranslator.gsをコピペしてTOKENだけ書き換えてウェブアプリケーションとして公開するだけです。

1. GoogleドライブでGoogleAppScriptを新規作成します。(見当たらない場合は [+アプリを追加] から探す)
![gas_01](https://user-images.githubusercontent.com/16908935/74428033-97afce00-4e9b-11ea-844b-493a806d2bf7.jpg)

2. リポジトリの "GAS" ディレクトリに入っている "SlackTranslator.gs" の中身をコピペします。

3. ソースコード内の TOKEN 部分を、控えておいた OAuth Access Token に差し替えます。

4. メニューの[公開] > [アプリケーション] ボタンを押します。

5. [Execute the app as:] は "Me(`example@gmail.com`)" を選択します。

6. [Who has access to the app:] は "Anyone, even anonymous" を選択します。

7. [導入] ボタンを押してデプロイします。

8. デプロイ後に表示されるURLをSlackApp側に設定するので控えておきます。


### Slack App URL settings

SlackApp側にイベント通知先を設定します。

1. [Event Subscriptions] の [Request URL] に GAS側で控えておいたURLを設定します。


### Slack Emoji settings

Slackに翻訳用の絵文字を追加します。

1. リポジトリの "Resource" ディレクトリに入っている "en.png" を ":en:" としてSlackに絵文字追加します。

2. リポジトリの "Resource" ディレクトリに入っている "jp.png" を ":jp:" としてSlackに絵文字追加します。

※ 画像は好きなものを使っていただいて構いませんが、":en:", ":jp:" は変えないで下さい。


## Reference

https://qiita.com/hotpepsi/items/3862618b38b463d37b53

https://www.slideshare.net/tomomi/japanese-developing-a-bot-for-your-workspace-82133038

https://nju33.com/note/post?note=slack&post=特定のメッセージを取得

