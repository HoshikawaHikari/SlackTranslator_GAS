# SlackTranslator

Slack�Ń��A�N�V�����ɑ΂��Ĕ�������|��{�b�g�B  
Translation bot that responds to Emoji Reactions in Slack.


## Getting Started

����̊G�����̃��A�N�V�������������Ƃ����m���ē��삷��Slack�̖|��{�b�g�ł��B

Google Apps Script (GAS) ���g���Ă���̂ŁA�����ōő�1��1����̎��s���\�ł��B  
������Google�A�J�E���g�̑���GAS��URLFetch���g���Ă��炸�A�p�[�}�����N�����g�p���Ȃ��ݒ�̏ꍇ�̍ő吔�B

�����菇��[Installation]("https://github.com/HoshikawaHikari/SlackTranslator_GAS#Installation") ���Q�l�ɂ��ĉ������B


## Prerequisites

- You have permission to add apps to Slack.
- Slack�ɃA�v����ǉ����錠�������邱�ƁB

## Installation


### Create Slack App

�܂� [SlackApp]("https://api.slack.com/apps") �̍쐬���s���B
�V�KSlackApp�ɃC�x���g�̐ݒ�ƌ����X�R�[�v�̐ݒ�����ă��[�N�X�y�[�X�ɃC���X�g�[�����܂��B

1. [Create New App] �{�^����������SlackApp��V�K�쐬���܂��B

2. [Event Subscriptions] ��ON�ɂ��� [Subscribe to workspace events] �� "reaction_added" ��ǉ����܂��B
![2020-02-13 19 19 11 api slack com 42e445c05fcd](https://user-images.githubusercontent.com/16908935/74427767-0fc9c400-4e9b-11ea-80f8-5746507227ad.jpg)

3. [OAuth & Permissions] > [Scopes] > [Bot Token Scopes] �� "reactions:read", "channels:history", "chat:write" ��ǉ����܂��B
![2020-02-13 19 59 34 api slack com fb55921afb42](https://user-images.githubusercontent.com/16908935/74427925-61724e80-4e9b-11ea-82bc-ca32721007cf.jpg)

4. [OAuth & Permissions] > [OAuth Tokens & Redirect URLs] ���ڂ� [Install App to WorkSpace] �{�^���������ă��[�N�X�y�[�X�ɃC���X�g�[�����܂��B

5. �C���X�g�[�������� OAuth Access Token ���\�������̂�GAS���Ŏg���ׂɍT���Ă����܂��B


### Create Google Apps Script

GAS���̐ݒ���s���܂��B
�V�KGAS��SlackTranslator.gs���R�s�y����TOKEN�������������ăE�F�u�A�v���P�[�V�����Ƃ��Č��J���邾���ł��B

1. Google�h���C�u��GoogleAppScript��V�K�쐬���܂��B(��������Ȃ��ꍇ�� [+�A�v����ǉ�] ����T��)
![gas_01](https://user-images.githubusercontent.com/16908935/74428033-97afce00-4e9b-11ea-844b-493a806d2bf7.jpg)

2. ���|�W�g���� "GAS" �f�B���N�g���ɓ����Ă��� "SlackTranslator.gs" �̒��g���R�s�y���܂��B

3. �\�[�X�R�[�h���� TOKEN �������A�T���Ă����� OAuth Access Token �ɍ����ւ��܂��B

4. ���j���[��[���J] > [�A�v���P�[�V����] �{�^���������܂��B

5. [Execute the app as:] �� "Me(example@gmail.com)" ��I�����܂��B

6. [Who has access to the app:] �� "Anyone, even anonymous" ��I�����܂��B

7. [����] �{�^���������ăf�v���C���܂��B

8. �f�v���C��ɕ\�������URL��SlackApp���ɐݒ肷��̂ōT���Ă����܂��B


### Slack App URL settings

SlackApp���ɃC�x���g�ʒm���ݒ肵�܂��B

1. [Event Subscriptions] �� [Request URL] �� GAS���ōT���Ă�����URL��ݒ肵�܂��B


### Slack Emoji settings

Slack�ɖ|��p�̊G������ǉ����܂��B

1. ���|�W�g���� "Resource" �f�B���N�g���ɓ����Ă��� "en.png" �� ":en:" �Ƃ���Slack�ɊG�����ǉ����܂��B

2. ���|�W�g���� "Resource" �f�B���N�g���ɓ����Ă��� "jp.png" �� ":jp:" �Ƃ���Slack�ɊG�����ǉ����܂��B

�� �摜�͍D���Ȃ��̂��g���Ă��������č\���܂��񂪁A":en:", ":jp:" �͕ς��Ȃ��ŉ������B


## Reference

https://qiita.com/hotpepsi/items/3862618b38b463d37b53

https://www.slideshare.net/tomomi/japanese-developing-a-bot-for-your-workspace-82133038

https://nju33.com/note/post?note=slack&post=����̃��b�Z�[�W���擾

