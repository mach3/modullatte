
# Modullatte

## これはなに

Dreamweaverのライブラリ機能に似た挙動をする、node.jsベースのHTMLのモジュールツールです。
Gruntタスクとして利用できます。

## 主な機能

- #module コメントで括られた箇所に、該当するモジュールHTMLを読み込みこんで保存します
- モジュール内の相対パスを書き換えます
- 仕上げにHTMLを自動整形するオプションがあります（ [einars/js-beautify](https://github.com/einars/js-beautify) )
- 自動整形のオプションがオフの場合は、インデントのみあわせて挿入します

## インストール

```
npm install modullatte
```

## HTMLモジュールの例

次のようにファイルが配置されていると想定します。

```
root/
├ public_html/
│ ├ modules/
│ │ ├ navi.html
│ │ └ ...
│ ├ index.html
│ └ ...
└ Gruntfiles.js
```

### モジュールを読み込む

- navi.html 

```html
<ul>
	<li><a href="../foo.html">foo</a></li>
	...
</ul>
```

- index.html

```html
<!-- #module "./modules/navi.html" -->
<!-- /#module -->
```

index.htmlに対してModullatteを実行すると、次のように展開されます。

```html
<!-- #module "./modules/navi.html" -->
<ul>
	<li><a href="foo.html">foo</a></li>
	...
</ul>
<!-- /#module -->
```

モジュールを編集したら、再度Modullatteを実行すればHTMLが更新されます。


## Gruntタスク

```javascript
grunt.loadNpmTasks("modullatte");

grunt.initConfig({
	modullatte : {
		options : {
			verbose : true,
			ignore : true,
			ignore_names : ["^_"]
		},
		dist : {
			src : [
				"public_html/**/*.html"
			]
		}
	}
});
```

尚、該当のファイルをそのまま上書きしますのでご注意ください。
複製したファイルを扱うか、事前のバックアップをお勧めします。
（modullatteを使用する事によりファイルが破損しても一切責任は負いかねます）


### オプション

- beautify : Boolean (false) - js_beautifyを使用してHTMLの整形を行う・行わない
- verbose : Boolean (true) - 詳細ログを出力する
- ignore : Boolean (true) - ignore_names にマッチするファイルを無視する
- ignore_names : Array|String (["^_"]) - 無視するファイル名のパターンを指定する

上記以外のオプションは [js-beautify](https://github.com/einars/js-beautify) のbeautify-html.jsへ渡す為のオプションです。
個人的な好みにより、インデントの初期値だけ違います。

- indent_size : Integer (1)
- indent_char : String ("\t")
- max_char : Integer (250)
- brace_style : String ("collapse") - "collapse" | "expand" | "end-expand"
- indent_scripts : String ("normal") - "keep"|"separate"|"normal"

## Grunt以外で使う例

ライブラリを利用して使う場合はファイルの上書きは行われません。
変わりに、生成した結果のHTML文字列が返されます。

### buildメソッドを使用する

build() メソッドで結果を返します。

```javascript
var modullatte = require("modullatte");

var result = modullatte.build("./the/path/to/file.html", { /* options */ });
```

### インスタンスを使用する

create() でインスタンスを返します。validate() ではmodullatteのタグが正常かどうかを検証し、
build() で結果が返ります。

```javascript
var modullatte = require("modullatte");

var instance = modullatte.create("./the/path/to/file.html", { /* options */ });
modullatte.validate(function(error, instance){
	if(! error){
		console.log(instance.build());
	}
});
```

オプションは、前項の物のうち、下記の物を指定出来ます。  
beautify, indent_size, indent_char, max_char, brace_style, indent_scripts



## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
