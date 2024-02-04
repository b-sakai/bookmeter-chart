# bookmeter-chart for myself

## About

* 自分用に読書メーターの、読書履歴をReactで可視化するプログラム群で、スクレイピング用のpythonプログラム（src/python/scraping.py)と表示用のReactコンポーネント(src/bookmeterHistoryGraph.js）からなる
* 本当は自動でスクレイピングしたかったのだが、フロントエンドでのスクレピングがサーバー側のコード（読書メーター側のコード）を修正する必要があり、難しいため断念
* その代わり、Github Actionを用いて、１日１回スクレイピングプログラムを実行するようにしたはず（できているか未確認）

## Github Pages

https://b-sakai.github.io/bookmeter-chart/

## Requirements

### python

* python3
* request, bs4

### npm packages

* chartjs-adapter-moment
* react-chartjs-2
* chart.js
* chartjs-adapter-date-fns

## Reference

https://bookmeter.com/home
