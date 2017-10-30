# TutoReal(チュートリアル)

[![TutoReal](https://raw.githubusercontent.com/jphacks/SP_1704/master/thum.png)](https://youtu.be/dtlhdI4MGFo)

## 製品概要
### Tutorial x Tech

### 背景（製品開発のきっかけ、課題等）
* 常識やローカルルールについての情報は、検索しても得られない。
  * 人に聞くのも難易度が高い、人に聞けない場面もある。
* これらの知識がないと、対象のサービスが利用できなかったり、周りに迷惑になったりする。
  * 使用方法がわからず利用できなかった、使用方法を誤って壊してしまった等
* したがって、常識やローカルルールについての知識がない、日本人や外国人向けのプロダクトを開発した。
  * オリンピック等、国際的なイベントの存在もあり、需要が高まると判断した。

### 製品説明（具体的な製品の説明）
* あらゆるモノ・コトについて、チュートリアルを提示するアプリケーション。
* ユーザーは、 **検索しにくい（または、検索するまでもない）基本的な情報** を、その場に居るだけで **チュートリアル** として受け取ることが出来る。
  * 例えば、特定のお店のルールや雰囲気、特定の製品の具体的な使用方法、ある地域のバスへの乗り方、外国でのマナー等。
* 対象物にBLE Beaconを組み込み（設置し）、アプリケーションがそれを検知すると、自動的に情報が表示される。

### 特長

#### 1. 特長1
* ビーコンを使い、特定の狭い範囲でチュートリアルを表示することができる。
#### 2. 特長2
* 外国人等、現地と言語の壁があるユーザーも利用できる。
  * 言葉による説明を可能な限り排除している。
  * 写真やピクトグラム、ナンバリングや記号を用いている。

### 解決出来ること
* 利用者は、このアプリケーションを利用して、その場での困ったことを瞬時に解決できる。

### 今後の展望
* 小型かつ安価なビーコンの開発。
* チュートリアルの登録方法を改善する。
  * 現状はDjango REST Framework標準の投稿フォームを使っている。
* イベントなど、常時存在しない物へ対応できるようにする。
* 説明の多言語対応
  * 観光目的の外国人向けに
  * オリンピック等、国際的なイベントへ参加する外国人向けに
* 協会、連盟、企業と連携
  * コンテンツの数を増やし、質を高める。
* 企業と協力してビーコン付きの製品を作り、利用方法等をアプリケーションで見られるようにする。

## 開発内容・開発技術
### 活用した技術
#### API・データ
今回用いた、スポンサーから提供されたAPIやデータは無い。

#### フレームワーク・ライブラリ・モジュール
* サーバー開発のフレームワークには [Django](https://www.djangoproject.com/) & [Django REST framework](http://www.django-rest-framework.org/) を用いた。
  * サーバー側の仕様はしごく単純であったので、Django REST framework を用いてREST APIと簡略化のためのエンドポイントを合わせて2~3時間程度で実装できた。
* アプリはReact Native + Reduxを用いて開発した。
  * 元々Webの技術スタックがあり、高速に開発が可能であると考えた。
* BLE Beaconの検知をするために、react-native-ble-managerという外部のモジュールを用いた。
  * BLE Beaconを検出したらコールバックしてくれるだけのシンプルなモジュールだが、今回の開発で一番苦労した点は、これを動作させることだった。
  * Bleutoothという、ネイティブな機能を使うので、React Native外の要因(例えばXcodeのキャッシュやネイティブ環境のバージョン等)で動作しなくなり、原因の特定に苦労した。

#### デバイス
* iOS端末向けアプリケーションを開発した。
* BLE Beaconを用いた。
  * 開発では適当なAndroid端末で代用した。

### 研究内容・事前開発プロダクト（任意）
* 事前の研究や開発は無い。
  * アイデア出しからデプロイまで、 **すべてHackday中に行った。**

### 独自開発技術（Hack Dayで開発したもの）
#### 2日間に開発した独自の機能・技術
* アプリの設計には、MDD(model driven design)+Flux+Reduxを参考にした、オリジナルのフレームワークを用いた。
  * MDDにある層状アーキテクチャやエンティティ、バリューオブジェクトなどの概念を元に、FluxやReduxを混ぜて本案件に最適化した。
  * 例えば、/app/src以下にあるReduxの登場概念が、層状アーキテクチャによって完全に分離されている。
  * このフレームワークによって、データの流れが明確になり、複雑なドメインの要件を簡潔に解決できたと思う。
* 全てのUIはフルスクラッチで開発した。
  * React NativeにはUIに関する便利なモジュールがたくさんあるが、今回は利用出来なかった。
  * なぜなら、前述のBLEの機能を動作させるために、React Native自体のバージョンを下げる必要があったからだ。
  * 開発期間的にとても厳しかったが、Webの技術スタックがあったため、なんとか実装しきることができた。
  * また、なんとしてもこのプロダクトを実現したいという、開発メンバーの結束が、Hackday1日目から2日目にかけての、深夜のコミットログに現れていると思う。
