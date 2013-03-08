
# Modullatte

version 1.0.0

## これはなに

Dreamweaverのライブラリ機能に似た挙動をする、node.jsベースのHTMLのモジュールツールです。
Gruntタスクとして利用できます。

## 主な機能

- #module コメントで括られた箇所に、該当するモジュールHTMLを読み込みこんで保存します
- モジュール内の相対パスを書き換えます
- 仕上げにHTMLを自動整形します（ [einars/js-beautify](https://github.com/einars/js-beautify) )

## インストール

```
npm install modullatte
```

## Gruntタスクの例

```
grunt.loadNpmTasks("modullatte");

grunt.initConfig({
	modullatte : {
		options : {
			indent_size : 4,
			indent_char : " "
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
（不具合によりファイルが破損しても責任は負いかねます）

## オプション

"beautify" 以外の全てのオプションは [js-beautify](https://github.com/einars/js-beautify) のbeautify-html.jsへ渡す為のオプションです。
個人的な好みにより、インデントの初期値だけ違います。

### beautify : Boolean (true)

HTMLの整形を行う/行わない

### indent_size : Integer (1)
### indent_char : String ("\t")
### max_char : Integer (250)
### brace_style : String ("collapse") - "collapse" | "expand" | "end-expand"
### indent_scripts : String ("normal") - "keep"|"separate"|"normal"


## Grunt以外で使う例

ライブラリを利用して使う場合はファイルの上書きは行われません。
変わりに、生成した結果のHTML文字列が返されます。


```
var modullatte = require("modullatte");

var result = modullatte.build("./the/path/to/file.html", {
	indent_size : 4,
	indent_char : " "
});
```

## 作者

mach3

- [Website](http://www.mach3.jp)
- [Blog](http://blog.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)
