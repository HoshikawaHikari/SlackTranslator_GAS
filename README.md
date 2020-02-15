# SlackTranslator_GAS

Slackでリアクションに対して反応する翻訳ボット。  
Translation bot that responds to Emoji Reactions in Slack.


## Getting Started

- Adout  
特定の絵文字のリアクションがついたことを検知して動作するSlackの翻訳ボットです。
![EN2zpzLUwAEuCIr](https://user-images.githubusercontent.com/16908935/74594032-16ac2e80-5075-11ea-8c3d-e2ade468dab4.png)
![EN2udLuUYAAHCmr](https://user-images.githubusercontent.com/16908935/74594040-20359680-5075-11ea-82ff-0324e9d5d8dd.png)

Google Apps Script (GAS) を使用するので、無料で最大1日1万回の実行が可能です。  
※同じGoogleアカウントの他のGASでURLFetchが使われておらず、パーマリンク等を使用しない設定の場合の最大数。

- Installation  
導入手順は [Installation](https://github.com/HoshikawaHikari/SlackTranslator_GAS#installation) を参考にして下さい。

- Customization  
カスタム方法は [Source code custom](https://github.com/HoshikawaHikari/SlackTranslator_GAS#source-code-custom) を参考にして下さい。


## Prerequisites

- Slackにアプリを追加する権限があること。

## Installation

手順としては以下の4つです。
1. SlackAppの作成と設定
2. GASの作成と公開
3. GASのURLをSlackAppに設定
4. Slackに絵文字追加

### Create Slack App

まず [SlackApp](https://api.slack.com/apps) の作成と設定です。  
新規SlackAppにイベントの設定と権限スコープの設定をしてワークスペースにインストールします。

1. [Create New App] ボタンを押してSlackAppを新規作成します。

2. [Event Subscriptions] をONにして [Subscribe to workspace events] に "reaction_added" を追加します。
![2020-02-13 19 19 11 api slack com 42e445c05fcd](https://user-images.githubusercontent.com/16908935/74427767-0fc9c400-4e9b-11ea-80f8-5746507227ad.jpg)

3. [OAuth & Permissions] > [Scopes] > [Bot Token Scopes] に必要なスコープを追加します。  
   最低限必要なものは "reactions:read", "channels:history", "chat:write" です。
![2020-02-13 19 59 34 api slack com fb55921afb42](https://user-images.githubusercontent.com/16908935/74427925-61724e80-4e9b-11ea-82bc-ca32721007cf.jpg)

4. [OAuth & Permissions] > [OAuth Tokens & Redirect URLs] 項目の [Install App to WorkSpace] ボタンを押してワークスペースにインストールします。

5. インストールしたら OAuth Access Token が表示されるのでGAS側で使う為に控えておきます。

6. お好みでアイコン等を設定します。


### Create Google Apps Script

GAS側の設定を行います。  
新規GASに`SlackTranslator.gs`をコピペして`TOKEN`だけ書き換えてウェブアプリケーションとして公開するだけです。

1. GoogleドライブでGoogleAppScriptを新規作成します。(見当たらない場合は [+アプリを追加] から探す)
![gas_01](https://user-images.githubusercontent.com/16908935/74428033-97afce00-4e9b-11ea-844b-493a806d2bf7.jpg)

2. リポジトリの "GAS" ディレクトリに入っている `SlackTranslator.gs` の中身をコピペします。

3. ソースコード内の `TOKEN = xoxp-...` の部分を、控えておいた OAuth Access Token に差し替えます。

4. メニューの[公開] > [ウェブアプリケーションとして導入] ボタン押してデプロイします。
   - [Execute the app as:] は "Me(`example@gmail.com`)" を選択します。
   - [Who has access to the app:] は "Anyone, even anonymous" を選択します。
   - [導入] ボタンを押してデプロイします。

8. デプロイ後に表示される`URL`をSlackApp側に設定するので控えておきます。


### Slack App URL settings

SlackApp側にイベント通知先を設定します。

1. [Event Subscriptions] の [Request URL] に GAS側で控えておいた`URL`を設定します。


### Slack Emoji settings

Slackに翻訳用の絵文字を追加します。

1. リポジトリの "Resource" ディレクトリに入っている "en.png" を `:en:` としてSlackに絵文字追加します。

2. リポジトリの "Resource" ディレクトリに入っている "jp.png" を `:jp:` としてSlackに絵文字追加します。

※ 画像は好きなものを使っていただいて構いませんが、`:en:`, `:jp:` は変えないで下さい。


## Source code custom

### TOKEN
ソースコードのTOKENにはSlackAppで発行されたトークンを代入して下さい。

### Message Quote
ソースコードのQUOTEフラグを変更することで、翻訳後のメッセージに翻訳前の文章を引用で添付できます。

- `var QUOTE = true;`  
![image](https://user-images.githubusercontent.com/16908935/74594334-94256e00-5078-11ea-9184-12aa48165c1c.png)

- `var REF_QUOTE = true;`  
![image](https://user-images.githubusercontent.com/16908935/74594382-0bf39880-5079-11ea-91af-72fdb18136bf.png)

- `var REF_QUOTE_HIDE_URL = true;`  
![image](https://user-images.githubusercontent.com/16908935/74594398-51b06100-5079-11ea-9d88-91c291a46517.png)

- `var REF_QUOTE_UNFURL = true;`  
![image](https://user-images.githubusercontent.com/16908935/74594410-83292c80-5079-11ea-97d7-8dd5f69a5706.png)


### Add translate target languages

翻訳させる言語の変更や追加を行いたい場合は、`getTranslateCode()` 関数の中を変更して下さい。


## Reference

https://qiita.com/hotpepsi/items/3862618b38b463d37b53

https://www.slideshare.net/tomomi/japanese-developing-a-bot-for-your-workspace-82133038

https://nju33.com/note/post?note=slack&post=特定のメッセージを取得

