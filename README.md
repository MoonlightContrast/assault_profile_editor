# Assault rune generator
Assault rune generatorは任意の2つのルーン文字を合成し
任意のサイズにて1枚の画像にするツールです。

# Features
Assault rune generatorはブラウザ上で動作します。
またファイル一式が揃っていればオフライン上でも動作するようになっています。

![ツールイメージ](https://user-images.githubusercontent.com/104244693/164890186-2a29cfc6-b14d-4768-ae71-abd4df91365e.jpeg)

![生成ルーン](https://user-images.githubusercontent.com/104244693/164890184-d29247be-0eba-45ed-acef-437db17b114b.png)

# Requirement
ある程度最新のブラウザであれば動作するはずです。

# Installation
本リポジトリのCode→Download Zipより一式をダウンロード
任意の場所で展開してください。

# Usage
展開したZipファイル内のAssaultRuneGenerator.htmlをブラウザで
表示することで起動できます。

**各項目の説明**

|項目                        |説明         |
|--------------------------|-----------|
|Rune1,2                   |合成するルーン文字を選択|
|Color1,2                  |各ルーン文字の色を設定|
|Mirror                    |ルーン文字を反転させる場合チェック |
|**Background**            |画像設定周り|
|Color                     |合成したルーン文字の背景色を設定  |
|Lap. color                |ルーン文字が重なっている箇所の色を設定 |
|Size(px)                  |合成後の画像サイズ(ピクセル単位)   |
|Real time                 |設定変更毎に随時画像生成する場合チェック|
|Show unofficial rune      |アングロサクソンルーンに含まれているが未だ出現していないルーンを非公式として表示する場合チェック|
|**Horizontal Position**|水平位置設定|
|Center|合成したルーンを中央に表示|
|Left|例えばCEN2+URのように合成結果が左側に寄ってしまう組み合わせの合成結果を中央に表示するための設定|
|Right|Leftの逆で合成結果が右側に寄ってしまう組み合わせを中央に表示するための設定|

各項目を設定しGenerateボタンを押すことで画像を生成することができ
生成された画像を右クリックして「名前をつけて保存」にて保存することができます。

# Note
非公式ルーンは形状が確定しておりませんので
仮に将来使用された場合に形状が変わる可能性があります。
