# social-filter-node

元ネタ

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">図です <a href="https://t.co/2OFfuLPk2l">pic.twitter.com/2OFfuLPk2l</a></p>&mdash; 4869 (@sh4869sh) <a href="https://twitter.com/sh4869sh/status/767244989503901696">2016年8月21日</a></blockquote>

# これは何？

- 文字列を送ると、その名詞と形容詞と動詞を特定文字列に変換するフィルター
  - "わたしはパンをたべました" -> "にゃんはにゃんをにゃーんました"
- config.ini をいじればどの品詞をどのように変換するか設定できる

## 必要なもの

- MeCab
- Node.js(v8.2.1)
- `npm install`

### MeCabのインストールについて

MeCabをインストールするにはパッケージマネージャの利用、または、以下の手順でマニュアルインストールが可能です:
```sh
git clone https://github.com/taku910/mecab.git

# install mecab
cd mecab/mecab
./configure  --enable-utf8-only
make
make check
make install

# install dictionary
cd ../mecab-ipadic
./configure --with-charset=utf8
make
make install
```


# 使い方の例

- サーバ側の設定
```sh
$ node index.js
social_filter server begin
```

- curlによるテスト
```
$ curl -X POST http://localhost:3000/filter -H "Accept: application/json" -H "Content-type: application/json" -d '{ "text" : "わたしはパンをたべました" }'
{
	"result": "にゃんはにゃんをにゃーんました"
}
```
