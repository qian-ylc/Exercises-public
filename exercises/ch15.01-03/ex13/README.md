1. nav 要素内のリンク \
`link = document.querySelectorAll('nav a')`
![alt text](console/image1.png)

2. 商品リスト (.product-list) 内の最初の商品 (.product-item)\
`document.querySelector('.product-list .product-item')`
![alt text](console/image2.png)

3. カートアイコンの画像 (<img>)\
`document.querySelector('.cart img')`
![alt text](console/image3.png)

4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
`document.querySelectorAll('.product-list .price')`
![alt text](console/image4.png)

5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像
`document.querySelectorAll('.product-list .product-item img')`
![alt text](console/image5.png)

6. 検索バー (.search-bar) 内の検索ボタン
`document.querySelectorAll('.search-bar button')`
![alt text](console/image6.png)

7. フッター (footer) 内のパラグラフ
`document.querySelectorAll('footer p')`
![alt text](console/image7.png)

8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
`document.querySelectorAll('.product-list .product-item:nth-child(even)')`
![alt text](console/image8.png)

9. ヘッダー (header) 内のアカウントリンク (.account) の画像
`document.querySelector('header .account img')`
![alt text](console/image9.png)

10. ナビゲーションリンクのうち、"会社情報" のリンク
`document.querySelector('a[href="#about"]')`
![alt text](console/image10.png)